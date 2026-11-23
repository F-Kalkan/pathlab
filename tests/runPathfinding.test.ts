import { expect, test } from 'vitest'
import { parseMap } from '../src/grid/parseMap'
import { dfs } from '../src/algorithms/dfs'
import { astar } from '../src/algorithms/astar'
import { bfs } from '../src/algorithms/bfs'
import { runPathfinding } from '../src/algorithms/runPathfinding'
import { dijkstra } from '../src/algorithms/dijkstra'
import { createGrid } from '../src/grid/grid'

// Test 1
test('runs the algorithm that matches the given name', () => {
    const map = parseMap(`
        S..
        ...
        G..
    `)
    expect(runPathfinding('astar', map.grid, map.start, map.goal)).toEqual(astar(map.grid, map.start, map.goal))
    expect(runPathfinding('bfs', map.grid, map.start, map.goal)).toEqual(bfs(map.grid, map.start, map.goal))
    expect(runPathfinding('dfs', map.grid, map.start, map.goal)).toEqual(dfs(map.grid, map.start, map.goal))
    expect(runPathfinding('dijkstra', map.grid, map.start, map.goal)).toEqual(dijkstra(map.grid, map.start, map.goal))
})

// Test 2
test('throws when the start is outside the grid', () => {
    const map = parseMap(`
        S..
        ...
        G..
    `)
    expect(() => runPathfinding('astar', map.grid, { row: 1, col: 4 }, map.goal)).toThrow('Start is outside the grid')
})

// Test 3
test('throws when the goal is outside the grid', () => {
    const map = parseMap(`
        S..
        ...
        G..
    `)
    expect(() => runPathfinding('astar', map.grid, map.start, { row: 1, col: 4 })).toThrow('Goal is outside the grid')
})

// Test 4
test('throws when the start is on a wall', () => {
    const map = parseMap(`
        S..
        .#.
        G..
    `)
    expect(() => runPathfinding('astar', map.grid, { row: 1, col: 1 }, map.goal)).toThrow('Start is on a wall')
})

// Test 5
test('throws when the goal is on a wall', () => {
    const map = parseMap(`
        S..
        .#.
        G..
    `)
    expect(() => runPathfinding('astar', map.grid, map.start, { row: 1, col: 1 })).toThrow('Goal is on a wall')
})

// Test 6
test('accepts the same cell as start and goal', () => {
    const map = parseMap(`
        S..
        ...
        G..
    `)
    const result = runPathfinding('astar', map.grid, { row: 1, col: 1 }, { row: 1, col: 1 })
    expect(result.pathLength).toBe(0)
})

// Test 7
test('throws for an empty grid', () => {
    const grid = createGrid(0, 0)
    expect(() => runPathfinding('astar', grid, { row: 0, col: 0 }, { row: 2, col: 0 })).toThrow('Start is outside the grid')
})