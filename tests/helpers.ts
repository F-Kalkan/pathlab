import { toCellId } from '../src/grid/cellId'
import type { Grid, Position } from '../src/grid/types'

export function isValidPath(grid: Grid, path: Position[], start: Position, goal: Position): boolean {
    if (path.length === 0) return false
    if (toCellId(path[0]) !== toCellId(start)) return false
    if (toCellId(path[path.length - 1]) !== toCellId(goal)) return false

    for (const cell of path) {
        if (grid[cell.row][cell.col].isWall) return false
    }

    for (let i = 1; i < path.length; i++) {
        const a = path[i - 1]
        const b = path[i]
        if (Math.abs(a.row - b.row) + Math.abs(a.col - b.col) !== 1) return false
    }

    return true
}