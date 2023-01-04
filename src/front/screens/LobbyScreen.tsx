import { prevent } from "../../func/dom"
import { PlayerColor } from "../../types"
import { ColorSelector } from "../component/ColorSelector"
import { NameSelector } from "../component/NameSelector"
import { useGame } from "../hooks/useGame"

type LobbyScreenProps = {

}

export function LobbyScreen({}: LobbyScreenProps) {

    const {send, context, can} = useGame()
    const colors = [PlayerColor.YELLOW, PlayerColor.RED]

    const joinGame = (name: string) => send({type: 'join', name: name, playerId: name})
    const chooseColor = (color: PlayerColor) => send({type: 'chooseColor', color, playerId: color === PlayerColor.YELLOW ? 'John' : 'Marc'})
    const startGame = () => send({type: 'start'})

    const canStart = can({type: 'start'})


    return <div>
        <ColorSelector onSelect={chooseColor} players={context.players} colors={colors} />
        <p> <button type='button' disabled={!canStart} className="button" onClick={prevent(startGame)}> Démmarer</button></p>
    </div>
}