import { expect, test } from 'vitest'
import { dijkstra } from '../src/algorithms/dijkstra'
import { parseMap } from '../src/grid/parseMap'
import { isValidPath } from './helpers'
import { bfs } from '../src/algorithms/bfs'
// Test 1
test('visits cells ring by ring in up, right, down, left order', () => {
    const map = parseMap(`
        S.
        .G
    `)
    const result = dijkstra(map.grid, map.start, map.goal)
    expect(result.found).toBe(true)
    expect(result.visitedOrder).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ])
    expect(result.pathLength).toBe(2)
    expect(result.pathCost).toBe(2)
})

// Test 2
test('stops with found false when the goal cannot be reached', () => {
    const map = parseMap(`
        S.#.
        ..#G
    `)
    const result = dijkstra(map.grid, map.start, map.goal)
    expect(result.found).toBe(false)
    expect(result.visitedOrder).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ])
    expect(result.pathLength).toBe(0)
    expect(result.pathCost).toBe(null)
    expect(result.path).toEqual([])
})

// Test 3
test('finds the goal at once when start and goal are the same cell', () => {
    const map = parseMap(`
        S.#.
        ..#G
    `)
    const result = dijkstra(map.grid, map.start, map.start)
    expect(result.found).toBe(true)
    expect(result.visitedOrder).toEqual([{ row: 0, col: 0 }])
    expect(result.pathLength).toBe(0)
    expect(result.pathCost).toBe(0)
    expect(result.path).toEqual([{ row: 0, col: 0 }])
})

// Test 4
test('finds an 8-step path across an open 5x5 grid', () => {
    const map = parseMap(`
        S....
        .....
        .....
        .....
        ....G
    `)
    const result = dijkstra(map.grid, map.start, map.goal)
    expect(result.pathLength).toBe(8)
    expect(result.pathCost).toBe(8)
    expect(result.path[0]).toEqual(map.start)
    expect(result.path[result.path.length - 1]).toEqual(map.goal)
})

// Test 5
test('finds a 1-step path when start and goal are side by side', () => {
    const map = parseMap(`
        SG
    `)
    const result = dijkstra(map.grid, map.start, map.goal)
    expect(result.pathLength).toBe(1)
    expect(result.pathCost).toBe(1)
    expect(result.path).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
    ])
})

// Test 6
test('finds a valid path through a winding map', () => {
    const map = parseMap(`
        S#...
        .#.#.
        .#.#.
        ...#G
    `)
    const result = dijkstra(map.grid, map.start, map.goal)
    expect(result.found).toBe(true)
    expect(isValidPath(map.grid, result.path, map.start, map.goal)).toBe(true)
    expect(result.pathLength).toBe(13)
    expect(result.pathCost).toBe(13)
})

// Test 7
test('finds the same shortest path cost as BFS on a map with several routes', () => {
    const map = parseMap(`
        S#...
        ...#.
        .#.#.
        #...G
    `)
    const resultDijkstra = dijkstra(map.grid, map.start, map.goal)
    const resultBfs = bfs(map.grid, map.start, map.goal)
    expect(resultDijkstra.found).toBe(true)
    expect(resultBfs.found).toBe(true)
    expect(isValidPath(map.grid, resultDijkstra.path, map.start, map.goal)).toBe(true)
    expect(isValidPath(map.grid, resultBfs.path, map.start, map.goal)).toBe(true)
    expect(resultBfs.pathLength).toBe(7)
    expect(resultBfs.pathLength).toBe(resultDijkstra.pathCost)
})