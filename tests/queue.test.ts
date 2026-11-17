import { expect, test } from 'vitest'
import { Queue } from '../src/structures/queue'

test('dequeues items in the order they were added', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(undefined)
})

test('returns undefined when dequeuing an empty queue', () => {
    const queue = new Queue<number>()
    expect(queue.dequeue()).toBe(undefined)
})

test('isEmpty is true at start, false after enqueue, true again after dequeue', () => {
    const queue = new Queue<number>()
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue(1)
    expect(queue.isEmpty()).toBe(false)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(true)
})

test('keeps the order when enqueue and dequeue are mixed', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.dequeue()).toBe(1)
    queue.enqueue(3)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.isEmpty()).toBe(true)
})