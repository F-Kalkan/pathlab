import { expect, test } from 'vitest'
import { parseMap } from '../src/grid/parseMap'

test('reads size, start, goal and walls from a text map', () => {
    const result = parseMap(`
S..#.
.#...
...#G
`)
    expect(result.grid.length).toBe(3)
    expect(result.grid[0].length).toBe(5)
    expect(result.start).toEqual({ row: 0, col: 0 })
    expect(result.goal).toEqual({ row: 2, col: 4 })
    expect(result.grid[1][1].isWall).toBe(true)
    expect(result.grid[0][1].isWall).toBe(false)
})

test('throws when the map has no start', () => {
    expect(() => parseMap(`.#.G`)).toThrow('no start')
})

test('throws when the map has no goal', () => {
    expect(() => parseMap(`S.#.`)).toThrow('no goal')
})