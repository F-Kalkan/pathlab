import { expect, test } from 'vitest'
import { getNeighbors } from '../src/grid/neighbors'
import { createGrid } from '../src/grid/grid'

// Test 1
test('middle cell has 4 neighbors in up, right, down, left order', () => {
    const grid = createGrid(3, 3)
    const pos = { row: 1, col: 1 }
    expect(getNeighbors(grid, pos)).toEqual([
        { row: 0, col: 1 }, // up
        { row: 1, col: 2 }, // right
        { row: 2, col: 1 }, // down
        { row: 1, col: 0 }, // left
    ])
})

// Test 2
test('corner cell has only 2 neighbors: right and down', () => {
    const grid = createGrid(3, 3)
    const pos = { row: 0, col: 0 }
    expect(getNeighbors(grid, pos)).toEqual([
        { row: 0, col: 1 }, // right
        { row: 1, col: 0 }, // down
    ])
})

// Test 3
test('corner cell in a rectangle grid has only 2 neighbors: up and left', () => {
    const grid = createGrid(3, 5)
    const pos = { row: 2, col: 4 }
    expect(getNeighbors(grid, pos)).toEqual([
        { row: 1, col: 4 }, // up
        { row: 2, col: 3 }, // left
    ])
})

// Test 4
test('a wall above a cell removes its up neighbor', () => {
    const grid = createGrid(3, 4, [{ row: 0, col: 1 }])
    const pos = { row: 1, col: 1 }
    expect(getNeighbors(grid, pos)).toEqual([
        { row: 1, col: 2 }, // right
        { row: 2, col: 1 }, // down
        { row: 1, col: 0 }, // left
    ])
})