import type { CellId, Position } from './types'

export function toCellId(pos: Position): CellId {
    return `${pos.row},${pos.col}`
}