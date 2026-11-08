import type { Grid, GridCell, Position } from './types'

export function isOutside(grid: Grid, pos: Position): boolean {
    return pos.row < 0 || pos.col < 0 || pos.row >= grid.length || pos.col >= grid[0].length
}

export function createGrid(rows: number, cols: number, walls: Position[] = []): Grid {
    const grid: Grid = []

    for (let r = 0; r < rows; r++) {
        const line: GridCell[] = []
        for (let c = 0; c < cols; c++) {
            line.push({ row: r, col: c, isWall: false })
        }
        
        grid.push(line)
    }
    
    for (const wall of walls) {
        if (isOutside(grid, wall)) throw new Error('Wall is outside the grid')
        grid[wall.row][wall.col].isWall = true
    }

    return grid
}

