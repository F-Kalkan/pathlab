import { expect, test } from 'vitest'
import { parseMap } from '../src/grid/parseMap'
import { bfs } from '../src/algorithms/bfs'
import { playbackReducer, playbackStartState } from '../src/playback/playbackReducer'

const map = parseMap(`
        SG
    `)
const result = bfs(map.grid, map.start, map.goal)
const playing = playbackReducer(playbackStartState, { type: 'run', result: result })

// Test 1
test('starts playing from step 0 when run arrives', () => {
    expect(playing.status).toBe('running')
    expect(playing.step).toBe(0)
    expect(playing.result).toEqual(result)
})

// Test 2
test('moves one step forward on each tick while playing', () => {
    const afterTick = playbackReducer(playing, { type: 'tick' })
    expect(afterTick.status).toBe('running')
    expect(afterTick.step).toBe(1)
})

// Test 3
test('ignores ticks while paused', () => {
    const paused = playbackReducer(playing, { type: 'pause' })
    expect(paused.status).toBe('paused')
    expect(paused.step).toBe(0)
    const pausedAfterTick = playbackReducer(paused, { type: 'tick' })
    expect(paused).toEqual(pausedAfterTick)
})

// Test 4
test('continues from the same step after resume', () => {
    const afterTick = playbackReducer(playing, { type: 'tick' })
    const paused = playbackReducer(afterTick, { type: 'pause' })
    const resumed = playbackReducer(paused, { type: 'resume' })
    expect(resumed.status).toBe('running')
    expect(resumed.step).toBe(1)
    const resumedAfterTick = playbackReducer(resumed, { type: 'tick' })
    expect(resumedAfterTick.status).toBe('running')
    expect(resumedAfterTick.step).toBe(2)
})

// Test 5
test('finishes after the last step and ignores later ticks', () => {
    const afterTick1 = playbackReducer(playing, { type: 'tick' })
    const afterTick2 = playbackReducer(afterTick1, { type: 'tick' })
    const afterTick3 = playbackReducer(afterTick2, { type: 'tick' })
    const afterTick4 = playbackReducer(afterTick3, { type: 'tick' })
    expect(afterTick4.status).toBe('finished')
    expect(afterTick4.step).toBe(4)
    const afterTick5 = playbackReducer(afterTick4, { type: 'tick' })
    expect(afterTick5).toEqual(afterTick4)
})

// Test 6
test('goes back to the start state on reset', () => {
    const afterTick1 = playbackReducer(playing, { type: 'tick' })
    const afterTick2 = playbackReducer(afterTick1, { type: 'tick' })
    const afterReset = playbackReducer(afterTick2, { type: 'reset' })
    expect(afterReset).toEqual(playbackStartState)
})

// Test 7
test('ignores a late tick after the map changes', () => {
    const afterMapChange = playbackReducer(playing, { type: 'mapChanged' })
    const afterTick = playbackReducer(afterMapChange, { type: 'tick' })
    expect(afterTick).toEqual(playbackStartState)
})