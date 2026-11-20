import { toCellId } from '../grid/cellId'
import { getNeighbors } from '../grid/neighbors'
import { reconstructPath } from '../grid/path'
import type { CellId, Grid, Position, SearchResult } from '../grid/types'
import { MinHeap } from '../structures/minHeap'

export function astar(grid: Grid, start: Position, goal: Position): SearchResult {
    const minHeap = new MinHeap<Position>()
    minHeap.push(start, manhattanDist(start, goal))
    const seen = new Set<CellId>()
    const visitedOrder: Position[] = []
    let found = false
    const cameFrom = new Map<CellId, Position>()
    const costTable = new Map<CellId, number>()
    costTable.set(toCellId(start), 0)

    while (!minHeap.isEmpty()) {
        const leaving = minHeap.pop()
        if (leaving === undefined) break
        if (seen.has(toCellId(leaving))) continue
        seen.add(toCellId(leaving))
        visitedOrder.push(leaving)
        if (leaving.row === goal.row && leaving.col === goal.col) {
            found = true
            break
        }

        const currentCost = costTable.get(toCellId(leaving))
        if (currentCost === undefined) continue
        for (const next of getNeighbors(grid, leaving)) {
            if (seen.has(toCellId(next))) continue
            const oldCost = costTable.get(toCellId(next))
            const newCost = currentCost + 1
            if (oldCost === undefined || newCost < oldCost) {
                costTable.set(toCellId(next), newCost)
                cameFrom.set(toCellId(next), leaving)
                minHeap.push(next, newCost + manhattanDist(next, goal))
            }
        }
    }
    const finalCost = costTable.get(toCellId(goal))
    const path = found ? reconstructPath(cameFrom, goal) : []
    const pathLength = found ? path.length - 1 : 0
    const pathCost = found && finalCost !== undefined ? finalCost : null
    return { found, visitedOrder, path, pathLength, pathCost }
}

function manhattanDist(current: Position, target: Position): number {
    return Math.abs(current.row - target.row) + Math.abs(current.col - target.col)
}