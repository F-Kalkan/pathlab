import { expect, test } from 'vitest'
import { bfs } from '../src/algorithms/bfs'
import { parseMap } from '../src/grid/parseMap'

test('visits cells ring by ring in up, right, down, left order', () => {
    const map = parseMap(`
S.
.G
`)
    const result = bfs(map.grid, map.start, map.goal)
    expect(result.found).toBe(true)
    expect(result.visitedOrder).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ])
})

test('stops with found false when the goal cannot be reached', () => {
    const map = parseMap(`
S.#.
..#G
`)
    const result = bfs(map.grid, map.start, map.goal)
    expect(result.found).toBe(false)
    expect(result.visitedOrder).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
    ])
})

test('finds the goal at once when start and goal are the same cell', () => {
    const map = parseMap(`
S.#.
..#G
`)
    const result = bfs(map.grid, map.start, map.start)
    expect(result.found).toBe(true)
    expect(result.visitedOrder).toEqual([{ row: 0, col: 0 }])
})