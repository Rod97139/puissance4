import { CSSProperties } from "react"
import { discColorClass } from "../../func/color"
import { prevent } from "../../func/dom"
import { CellState, GridState, PlayerColor} from "../../types"

type GridProps = {
    grid: GridState,
    color?: PlayerColor
    onDrop?: (x: number) => void
}

export function Grid ({grid, color, onDrop}: GridProps) {
    const cols = grid[0].length;
    const showColumns = color && onDrop
    return <div className="grid" style={{'--rows': grid.length, '--cols': cols} as CSSProperties}>
        {grid.map((row, y) => row.map((c, x) => <Cell x={x} y={y} color={c} key={`${x}-${y}`}/>))}
        {showColumns && <div className="columns">
            {new Array(cols).fill(1).map((_, k) => <Column onDrop={() => onDrop(k)} color={color} key={k}/>)}
        </div>}
    </div>
}

type CellProps = {
    x: number,
    y:number,
    color: CellState
}

function Cell({x, y, color}: CellProps) {
    return <div 
    style={{'--row': y} as CSSProperties}
    className={discColorClass(color)}
    />
}

type ColumnProps = {
    color: PlayerColor
    onDrop: () => void
}

function Column({color, onDrop}: ColumnProps) {
    return <button onClick={prevent(onDrop) } className="column">
        <div className={discColorClass(color)}></div>
    </button>
}