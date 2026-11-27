import type { GridCell, Position } from '../grid/types'
import { Cell, type CellKind } from './Cell'

function cellKind(cell: GridCell, start: Position, goal: Position): CellKind {
    if (cell.col === start.col && cell.row === start.row) return 'start'
    if (cell.col === goal.col && cell.row === goal.row) return 'goal'
    if (cell.isWall) return 'wall'
    return 'empty'
}

type GridProps = {
    grid: GridCell[][]
    start: Position
    goal: Position
}

export function Grid({ grid, start, goal }: GridProps) {
    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 28px)` }}>
            {grid.map(row =>
                row.map(cell => (
                    <Cell key={`${cell.row},${cell.col}`} kind={cellKind(cell, start, goal)} />
                ))
            )}
        </div>
    )
}