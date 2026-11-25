import type { SearchResult } from '../grid/types'

export type PlaybackState = {
    status: 'idle' | 'running' | 'paused' | 'finished'
    step: number
    result: SearchResult | null
}

export type PlaybackEvent =
    | { type: 'run'; result: SearchResult }
    | { type: 'pause' }
    | { type: 'resume' }
    | { type: 'reset' }
    | { type: 'mapChanged' }
    | { type: 'tick' }

export const playbackStartState: PlaybackState = {
    status: 'idle',
    step: 0,
    result: null
}

export function playbackReducer(state: PlaybackState, event: PlaybackEvent): PlaybackState {
    switch (event.type) {

        case 'run':
            return { status: 'running', step: 0, result: event.result }

        case 'pause':
            if (state.status === 'running')
                return { ...state, status: 'paused' }
            return state

        case 'resume':
            if (state.status === 'paused')
                return { ...state, status: 'running' }
            return state

        case 'reset': return playbackStartState

        case 'mapChanged': return playbackStartState

        case 'tick': {
            if (state.status !== 'running') return state
            if (state.result === null) return state
            const total = state.result.visitedOrder.length + state.result.path.length
            const nextStep = state.step + 1
            if (nextStep >= total) return { ...state, step: total, status: 'finished' }
            return { ...state, step: nextStep }
        }
    }
}