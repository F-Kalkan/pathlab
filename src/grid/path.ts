import { toCellId } from './cellId'
import type { CellId, Position } from './types'

export function reconstructPath(cameFrom: Map<CellId, Position>, goal: Position): Position[] {
    const path: Position[] = []
    let current: Position | undefined = goal

    while (current !== undefined) {
        path.push(current)
        current = cameFrom.get(toCellId(current))
    }

    return path.reverse()
}