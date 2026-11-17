import { expect, test } from 'vitest'
import { Stack } from '../src/structures/stack'

test('pops items in reverse order', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.pop()).toBe(undefined)
})

test('returns undefined when popping an empty stack', () => {
    const stack = new Stack<number>()
    expect(stack.pop()).toBe(undefined)
})

test('isEmpty is true at start, false after push, true again after pop', () => {
    const stack = new Stack<number>()
    expect(stack.isEmpty()).toBe(true)
    stack.push(1)
    expect(stack.isEmpty()).toBe(false)
    stack.pop()
    expect(stack.isEmpty()).toBe(true)
})

test('keeps the order when push and pop are mixed', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    expect(stack.pop()).toBe(2)
    stack.push(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(1)
    expect(stack.isEmpty()).toBe(true)
})