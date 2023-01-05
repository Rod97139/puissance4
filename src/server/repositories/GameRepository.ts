import { interpret, InterpreterFrom, t } from "xstate";
import { GameMachine } from "../../machine/GameMachine";
import { publishMachineToPlayers } from "../func/socket";
import { ConnexionRepository } from "./ConnexionRepository";

type Machine = InterpreterFrom<typeof GameMachine>

export class GameRepository {
    constructor(
        private connexions: ConnexionRepository,
        private games = new Map<string, Machine>
    ) {
        
    }

    create(id: string): Machine {
        const game = interpret(GameMachine)
        .onTransition((state) => {
            if (state.changed) {
                publishMachineToPlayers(state, this.connexions, id)
            }
        })
        .start()
        this.games.set(id, game)
        return game
    }

    find(id: string): Machine | undefined {
        return this.games.get(id)
    }

    clean(id: string) {
        const game = this.games.get(id)
        if (
            game &&
            game.state.context.players.filter(p => this.connexions.has(p.id, id)).length === 0
        ) {
            this.games.delete(id)
        }
    }
    
}