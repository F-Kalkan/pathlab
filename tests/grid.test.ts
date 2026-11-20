import { expect, test } from 'vitest'
import { createGrid } from '../src/grid/grid'

// Test 1
test('creates a grid with the given size and walls', () => {
    const grid = createGrid(3, 4, [{ row: 1, col: 2 }])
    expect(grid.length).toBe(3)
    expect(grid[0].length).toBe(4)
    expect(grid[1][2].isWall).toBe(true)
    expect(grid[0][0].isWall).toBe(false)
})

// Test 2
test('throws when a wall is outside the grid', () => {
    expect(() => createGrid(3, 3, [{ row: 5, col: 0 }])).toThrow()
})