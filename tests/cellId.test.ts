import { expect, test } from 'vitest'
import { toCellId } from '../src/grid/cellId'

test('turns a position into "row,col"', () => {
    expect(toCellId({ row: 4, col: 7 })).toBe('4,7')
})

test('gives different ids to (1,23) and (12,3)', () => {
    expect(toCellId({ row: 1, col: 23 })).not.toBe(toCellId({ row: 12, col: 3 }))
})