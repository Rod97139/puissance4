import { GameAction } from "../types";

export const joinGameAction: GameAction<"join"> = (context, event) => ({
    players: [...context.players, {id: event.playerId, name: event.name}]
})