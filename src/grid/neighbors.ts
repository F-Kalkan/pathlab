import type { Grid, Position } from './types'
import { isOutside } from './grid'

export function getNeighbors(grid: Grid, pos: Position): Position[] {
    const result: Position[] = []
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    for (const [dr, dc] of directions) {
        const newRow = pos.row + dr
        const newColumn = pos.col + dc
        const next: Position = { row: newRow, col: newColumn }
        
        if (isOutside(grid, next)) continue
        
        if (grid[newRow][newColumn].isWall) continue
        
        result.push(next)
    }
    return result
}