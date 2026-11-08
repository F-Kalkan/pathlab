export type Position = {
    row: number
    col: number
}

export type GridCell = {
    row: number
    col: number
    isWall: boolean
}

export type Grid = GridCell[][]

export type AlgorithmName = 'bfs' | 'dfs' | 'dijkstra' | 'astar'

export type SearchResult = {
    found: boolean
    visitedOrder: Position[]
    path: Position[]
    pathLength: number
    pathCost: number | null
}