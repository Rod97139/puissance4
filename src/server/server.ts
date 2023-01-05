
import Fastify from 'fastify'
import FastifyStatic from '@fastify/static'
import FastifyWebsocket from '@fastify/websocket'
import { v4 } from 'uuid'
import { sign, verify } from './func/crypto'
import { resolve } from 'path'
import { ServerErrors } from '../types'
import { ConnexionRepository } from './repositories/ConnexionRepository'
import { GameRepository } from './repositories/GameRepository'
import { GameModel } from '../machine/GameMachine'
import { publishMachine } from './func/socket'

const connexions = new ConnexionRepository()
const games = new GameRepository(connexions)

const fastify = Fastify({logger: true})
fastify.register(FastifyStatic, {
    root: resolve("./public")
})

fastify.register(FastifyWebsocket)
fastify.register(async (f) => {
    f.get('/ws', {websocket: true}, (connexion, req) => {
        const query = req.query as Record<string, string>
        const playerId = query.id ?? ''
        const signature = query.signature ?? ''
        const playerName = query.name || 'John Doe'
        const gameId = query.gameId

        if (!gameId) {
            connexion.end()
            f.log.error('Pas de GameId')
            return;
        }

        if (!verify(playerId, signature)) {
            
            f.log.error('Erreur d\'authenfication')
            connexion.socket.send(JSON.stringify({
                type: 'error', code: ServerErrors.AuthError
            }))

            return;
        }

        const game = games.find(gameId) ?? games.create(gameId)
        connexions.persist(playerId, gameId, connexion)
        game.send(GameModel.events.join(playerId, playerName))
        publishMachine(game.state, connexion)

        connexion.socket.on('message', (rawMessage) => {
            const messgae = JSON.parse(rawMessage.toLocaleString())
            if (messgae.type === 'gameUpdate') {
                game.send(messgae.event)
            }
            
        })
        connexion.socket.on('close', () => {
            connexions.remove(playerId, gameId)
            game.send(GameModel.events.leave(playerId))
            games.clean(gameId)
        })
    })
})

fastify.post('/api/players', (req, res) => {
    const playerId = v4()
    const signature = sign(playerId)
    res.send({
        id: playerId,
        signature: signature
    })
})

fastify.listen({port: 8000}).catch((err) => {
    fastify.log.error(err)
    process.exit(1)
}).then(() => {
    fastify.log.info('Le serveur ecoute sur le port 8000')
})
