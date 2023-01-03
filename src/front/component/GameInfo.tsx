import { discColorClass } from "../../func/color"
import { PlayerColor } from "../../types"

type GameInfoProps = {
    color: PlayerColor,
    name: string
}

export function GameInfo ({color, name}: GameInfoProps) {
    return <div>

    <h2 className="flex" style={{gap: '.7rem'}}>Au tour de {name} <div className={discColorClass(color)} ></div>de jouer</h2>
    </div>
}