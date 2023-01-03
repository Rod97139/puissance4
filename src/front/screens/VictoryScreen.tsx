import { send } from "xstate/lib/actions"
import { currentPlayer } from "../../func/game"
import { Victory } from "../component/Victory"
import { useGame } from "../hooks/useGame"

type VictoryScreenProps = {}

export function VictoryScreen({}: VictoryScreenProps) {
    const {context, send} = useGame()
    const player = currentPlayer(context)
    const restart = () => send({type: 'restart'})
    return <div>
        <Victory color={player.color!} name={player.name} onRestart={restart}/>
    </div>
    
}