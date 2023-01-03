import { currentPlayer } from "../../func/game"
import { GameInfo } from "../component/GameInfo"
import { useGame } from "../hooks/useGame"

type PlayScreenProps = {}

export function PlayScreen({ }: PlayScreenProps) {
    const {context} = useGame()
    const player = currentPlayer(context)
    return <div>
        <GameInfo color={player.color!} name={player.name}/>       
        {/*     "color!" ==> forcement défini */}
    
    </div>
}