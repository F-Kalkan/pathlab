export type CellKind = 'empty' | 'wall' | 'start' | 'goal'

type CellProps = {
    kind: CellKind
}

export function Cell({ kind }: CellProps) {
    return <div className={`cell ${kind}`}></div>
}