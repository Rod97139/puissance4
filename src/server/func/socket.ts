import { SocketStream } from "@fastify/websocket";
import { InterpreterFrom } from "xstate";
import { GameMachine } from "../../machine/GameMachine";
import { ConnexionRepository } from "../repositories/ConnexionRepository";

export function publishMachineToPlayers(
    machine: InterpreterFrom<typeof GameMachine>["state"],
    connexions: ConnexionRepository,
    gameId: string
    ) {
        for (const player of machine.context.players) {
            const connexion = connexions.find(player.id, gameId)
            if (connexion) {
                publishMachine(machine, connexion)
            }
        }
    }

    export function publishMachine(
        machine: InterpreterFrom<typeof GameMachine>["state"],
        connexion: SocketStream
    ) {
        connexion.socket.send(
            JSON.stringify({
                type: 'gameUpdate',
                state: machine.value,
                context: machine.context
            })
        )
    }
