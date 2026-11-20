import { expect, test } from 'vitest'
import { MinHeap } from '../src/structures/minHeap'

// Test 1
test('serves the most urgent item first, even if it arrives later', () => {
    const heap = new MinHeap<string>()
    heap.push('Ali', 5)
    heap.push('Ayşe', 2)
    heap.push('Mehmet', 8)
    expect(heap.pop()).toBe('Ayşe')

    heap.push('Zeynep', 1)
    expect(heap.pop()).toBe('Zeynep')
    expect(heap.pop()).toBe('Ali')
    expect(heap.pop()).toBe('Mehmet')
    expect(heap.pop()).toBe(undefined)
})

// Test 2
test('pops numbers from smallest to largest', () => {
    const heap = new MinHeap<number>()
    heap.push(5, 5)
    heap.push(2, 2)
    heap.push(8, 8)
    heap.push(3, 3)
    heap.push(4, 4)
    heap.push(9, 9)
    heap.push(1, 1)
    heap.push(6, 6)
    const leavingOrder: number[] = []
    while (!heap.isEmpty()) {
        const leaving = heap.pop()
        if (leaving === undefined) break
        leavingOrder.push(leaving)
    }
    expect(leavingOrder).toEqual([1, 2, 3, 4, 5, 6, 8, 9])
})

// Test 3
test('keeps arrival order for items with equal priority', () => {
    const heap = new MinHeap<string>()
    heap.push('A', 1)
    heap.push('B', 1)
    heap.push('C', 1)
    const leavingOrder: string[] = []
    while (!heap.isEmpty()) {
        const leaving = heap.pop()
        if (leaving === undefined) break
        leavingOrder.push(leaving)
    }
    expect(leavingOrder).toEqual(['A', 'B', 'C'])
})

// Test 4
test('reports empty correctly and returns undefined when popping an empty heap', () => {
    const heap = new MinHeap<string>()
    expect(heap.isEmpty()).toBe(true)
    expect(heap.pop()).toBe(undefined)
    heap.push('Ali', 5)
    expect(heap.isEmpty()).toBe(false)
    heap.pop()
    expect(heap.isEmpty()).toBe(true)
})