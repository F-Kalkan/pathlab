import { createGrid } from './grid'
import type { Grid, Position } from './types'

export type ParsedMap = {
    grid: Grid
    start: Position
    goal: Position
}

export function parseMap(text: string): ParsedMap {
    const lines = text.trim().split('\n').map(line => line.trim())
    const rows = lines.length
    const cols = lines[0].length

    const walls: Position[] = []
    let start: Position | undefined = undefined
    let goal: Position | undefined = undefined

    for (let r = 0; r < rows; r++) {
        if (lines[r].length !== cols) throw new Error(`Row ${r} has ${lines[r].length} cells, expected ${cols}`)
        for (let c = 0; c < cols; c++) {
            const ch = lines[r][c]
            if (ch === '#') walls.push({ row: r, col: c })
            if (ch === 'S') start = { row: r, col: c }
            if (ch === 'G') goal = { row: r, col: c }
        }
    }

    if (start === undefined) throw new Error('Map has no start (S)')
    if (goal === undefined) throw new Error('Map has no goal (G)')

    return { grid: createGrid(rows, cols, walls), start, goal }
}