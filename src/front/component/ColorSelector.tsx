import { discColorClass } from "../../func/color"
import { Player, PlayerColor } from "../../types"

type ColorSelectorProps = {
    onSelect: (color: PlayerColor) => void,
    players: Player[],
    colors: PlayerColor[]
}

export function ColorSelector({onSelect, players, colors}: ColorSelectorProps) {
   
    return <>
        <div className="players">
            {players.map(player => <div key={player.id} className="player">
                {player.name}
                {player.color && <div className={discColorClass(player.color)}></div>}
                </div>)}
        </div>
        <h3>Selectionner une Couleur</h3>
        <div className="selector">
            {colors.map(color => <button key={color} onClick={() => onSelect(color)}> <div className={discColorClass(color)}></div></button>)} 
        </div>
    </>
}