import { discColorClass } from "../../func/color"
import { prevent } from "../../func/dom"
import { PlayerColor } from "../../types"

type DrawProps = {
    onRestart?: () => void
}

export function Draw ({onRestart}: DrawProps) {
    return <div className="flex" style={{justifyContent: 'space-between'}}>

    <h2 className="flex" style={{gap: '.7rem'}}>Egalité ! Veuillez rejouer pour vous départager</h2>
    <button className="button" onClick={prevent(onRestart)}>Rejouer</button>
    </div>
}