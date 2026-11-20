type HeapItem<T> = {
    value: T
    priority: number
    order: number
}

export class MinHeap<T> {
    private items: HeapItem<T>[] = []
    private nextOrder = 0

    push(value: T, priority: number): void {
        this.items.push({ value, priority, order: this.nextOrder })
        this.nextOrder++

        let i = this.items.length - 1
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            if (!this.isBefore(this.items[i], this.items[parent])) break
            this.swap(i, parent)
            i = parent
        }
    }

    pop(): T | undefined {
        if (this.isEmpty()) return undefined

        const top = this.items[0]
        const last = this.items.pop()
        if (this.items.length > 0 && last !== undefined) {
            this.items[0] = last

            let i = 0
            while (2 * i + 1 < this.items.length) {
                const left = 2 * i + 1
                const right = 2 * i + 2
                let smaller = left
                if (right < this.items.length && this.isBefore(this.items[right], this.items[left])) smaller = right
                if (!this.isBefore(this.items[smaller], this.items[i])) break
                this.swap(i, smaller)
                i = smaller
            }
        }

        return top.value
    }

    isEmpty(): boolean {
        return this.items.length === 0
    }

    private swap(i: number, j: number): void {
        const temp = this.items[i]
        this.items[i] = this.items[j]
        this.items[j] = temp
    }

    private isBefore(a: HeapItem<T>, b: HeapItem<T>): boolean {
        return (a.priority < b.priority || (a.priority === b.priority && a.order < b.order))
    }
}