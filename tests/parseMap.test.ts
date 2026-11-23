import { expect, test } from 'vitest'
import { parseMap } from '../src/grid/parseMap'

// Test 1
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

// Test 2
test('throws when the map has no start', () => {
    expect(() => parseMap(`.#.G`)).toThrow('no start')
})

// Test 3
test('throws when the map has no goal', () => {
    expect(() => parseMap(`S.#.`)).toThrow('no goal')
})

// Test 4
test('throws when rows have different lengths', () => {
    expect(() => parseMap(`
        S.
        ...G
    `)).toThrow(`Row 1 has 4 cells, expected 2`)
})

// Test 5
test('throws when the map has an unknown character', () => {
    expect(() => parseMap(`
        s...
        ...G
    `)).toThrow(`Map has invalid character`)
})

// Test 6
test('throws when the map has more than one start', () => { 
    expect(() => parseMap(`
        S..S
        ...G
    `)).toThrow(`Map has more than one start`)
})

// Test 7
test('throws when the map has more than one goal', () => {
    expect(() => parseMap(`
        S...
        G..G
    `)).toThrow(`Map has more than one goal`)
})