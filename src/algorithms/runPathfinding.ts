import { isOutside } from '../grid/grid'
import type { AlgorithmName, Grid, Position, SearchResult } from '../grid/types'
import { astar } from './astar'
import { bfs } from './bfs'
import { dfs } from './dfs'
import { dijkstra } from './dijkstra'

const algorithmTable: Record<AlgorithmName, (grid: Grid, start: Position, goal: Position) => SearchResult> = {
    astar: astar,
    bfs: bfs,
    dfs: dfs,
    dijkstra: dijkstra,
}

export function runPathfinding(algorithm: AlgorithmName, grid: Grid, start: Position, goal: Position): SearchResult {
    if (isOutside(grid, start)) { throw new Error('Start is outside the grid') }
    if (isOutside(grid, goal)) { throw new Error('Goal is outside the grid') }
    if (grid[start.row][start.col].isWall) { throw new Error('Start is on a wall') }
    if (grid[goal.row][goal.col].isWall) { throw new Error('Goal is on a wall') }

    const selectedSearch = algorithmTable[algorithm]
    return selectedSearch(grid, start, goal)
}

