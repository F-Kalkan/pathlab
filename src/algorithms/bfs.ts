import { toCellId } from '../grid/cellId'
import { getNeighbors } from '../grid/neighbors'
import type { CellId, Grid, Position, SearchResult } from '../grid/types'
import { Queue } from '../structures/queue'

export function bfs(grid: Grid, start: Position, goal: Position): SearchResult {
    const queue = new Queue<Position>()
    queue.enqueue(start)
    const seen = new Set<CellId>()
    seen.add(toCellId(start))
    const visitedOrder: Position[] = []
    let found = false

    while (!queue.isEmpty()) {
        const current = queue.dequeue()
        if (current === undefined) break
        visitedOrder.push(current)
        if (current.row === goal.row && current.col === goal.col) {
            found = true
            break
        }
        for (const next of getNeighbors(grid, current)) {
            if (seen.has(toCellId(next))) continue
            seen.add(toCellId(next))
            queue.enqueue(next)
        }
    }
    return { found, visitedOrder, path: [], pathLength: 0, pathCost: null }
}