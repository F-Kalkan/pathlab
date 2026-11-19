import { toCellId } from '../grid/cellId'
import { getNeighbors } from '../grid/neighbors'
import { reconstructPath } from '../grid/path'
import type { CellId, Grid, Position, SearchResult } from '../grid/types'
import { Stack } from '../structures/stack'

export function dfs(grid: Grid, start: Position, goal: Position): SearchResult {
    const stack = new Stack<Position>()
    stack.push(start)
    const seen = new Set<CellId>()
    const visitedOrder: Position[] = []
    let found = false
    const cameFrom = new Map<CellId, Position>()

    while (!stack.isEmpty()) {
        const current = stack.pop()
        if (current === undefined) break
        if (seen.has(toCellId(current))) continue
        seen.add(toCellId(current))
        visitedOrder.push(current)
        if (current.row === goal.row && current.col === goal.col) {
            found = true
            break
        }

        for (const next of getNeighbors(grid, current).reverse()) {
            if (seen.has(toCellId(next))) continue
            stack.push(next)
            cameFrom.set(toCellId(next), current)
        }
    }
    const path = found ? reconstructPath(cameFrom, goal) : []
    const pathLength = found ? path.length - 1 : 0
    const pathCost = found ? pathLength * 1 : null
    return { found, visitedOrder, path, pathLength, pathCost }
}