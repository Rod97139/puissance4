
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
import { readFileSync } from 'fs'
import FastifyView from '@fastify/view'
import ejs from 'ejs'

const connexions = new ConnexionRepository()
const games = new GameRepository(connexions)
const env = process.env.NODE_ENV as 'dev' | 'prod'
let manifest = {}
try {
  const manifestData = readFileSync('./public/assets/manifest.json')
  manifest = JSON.parse(manifestData.toLocaleString())

} catch (error) {
    
    console.log(error);
    
}

const fastify = Fastify({logger: true})
fastify.register(FastifyView, {
    engine: {
      ejs: ejs,
    },
  });

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

fastify.get('/', (req, res) => {
res.view("/templates/index.ejs", { manifest, env: process.env.NODE_ENV })
})

fastify.post('/api/players', (req, res) => {
    const playerId = v4()
    const signature = sign(playerId)
    res.send({
        id: playerId,
        signature: signature
    })
})

fastify.listen({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
host: '0.0.0.0'
}).catch((err) => {
    fastify.log.error(err)
    process.exit(1)
}).then(() => {
    fastify.log.info('Le serveur ecoute sur le port 8000')
})
