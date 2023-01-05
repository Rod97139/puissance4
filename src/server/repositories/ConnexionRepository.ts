import { Player } from "../../types";
import { SocketStream } from '@fastify/websocket'

export class ConnexionRepository {
    constructor(
        private connexions = new Map<Player['id'], Map<string, SocketStream>>
    ) {
    }

    persist (playerId: Player['id'], gameId: string, connexion: SocketStream) {
        if (!this.connexions.has(playerId)) {
            this.connexions.set(playerId, new Map<string, SocketStream>())
        }
        this.connexions.get(playerId)!.set(gameId, connexion)
    }

    remove (playerId: Player['id'], gameId: string) {
        this.connexions.get(playerId)?.delete(gameId)
        if (this.connexions.get(playerId)?.size === 0) {
            this.connexions.delete(playerId)
        }
    }

    find(playerId: Player['id'], gameId: string): SocketStream | undefined {
        return this.connexions.get(playerId)?.get(gameId)       
    }

    has(playerId: Player['id'], gameId: string): boolean {
        return !!this.connexions.get(playerId)?.has(gameId)       // !!this forcément un boolean
    }
    
}