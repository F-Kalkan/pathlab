import { expect, test } from 'vitest'
import { dfs } from '../src/algorithms/dfs'
import { parseMap } from '../src/grid/parseMap'
import { isValidPath } from './helpers'

// Test 1
test('follows one branch to the end in up, right, down, left order', () => {
    const map = parseMap(`
        S..
        ...
        G..
    `)
    const result = dfs(map.grid, map.start, map.goal)
    expect(result.found).toBe(true)
    expect(result.visitedOrder).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
    ])
    expect(result.pathLength).toBe(8)
    expect(result.pathCost).toBe(8)
})

// Test 2
test('stops with found false when the goal cannot be reached', () => {
    const map = parseMap(`
        S.#.
        ..#G
    `)
    const result = dfs(map.grid, map.start, map.goal)
    expect(result.found).toBe(false)
    expect(result.visitedOrder).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
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
    const result = dfs(map.grid, map.start, map.start)
    expect(result.found).toBe(true)
    expect(result.visitedOrder).toEqual([{ row: 0, col: 0 }])
    expect(result.pathLength).toBe(0)
    expect(result.pathCost).toBe(0)
    expect(result.path).toEqual([{ row: 0, col: 0 }])
})

// Test 4
test('finds a valid path through a winding map', () => {
    const map = parseMap(`
        S#...
        .#.#.
        .#.#.
        ...#G
    `)
    const result = dfs(map.grid, map.start, map.goal)
    expect(result.found).toBe(true)
    expect(isValidPath(map.grid, result.path, map.start, map.goal)).toBe(true)
    expect(result.pathLength).toBe(13)
    expect(result.pathCost).toBe(13)
})

// Test 5
test('finds a 1-step path when start and goal are side by side', () => {
    const map = parseMap(`
        SG
    `)
    const result = dfs(map.grid, map.start, map.goal)
    expect(result.pathLength).toBe(1)
    expect(result.pathCost).toBe(1)
    expect(result.path).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
    ])
})
