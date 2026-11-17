export class Queue<T> {
    private items: T[] = []
    private head = 0

    enqueue(item: T): void {
        this.items.push(item)
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined
        const temp = this.items[this.head]
        this.head++
        return temp
    }

    isEmpty(): boolean {
        return this.head === this.items.length
    }
}