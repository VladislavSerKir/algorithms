interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getHead: () => number;
    getTail: () => number;
    getSize: () => number;
    returnArray: () => (T | undefined)[];
    clearArray: () => void;
    isEmpty: () => boolean
}

export class Queue<T> implements IQueue<T> {
    head: number = 0;
    tail: number = 0;
    length: number = 0;
    readonly size: number = 0;
    container: (T | undefined)[] = [];

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Error");
        }
        this.container[this.tail % this.size] = item
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.length === 0) {
            throw new Error("Error");
        }
        this.container[this.head % this.size] = undefined;

        if (this.head + 1 === this.size) {
            this.head = 0
        } else {
            this.head = this.head + 1
        }

        this.length--;
    };

    clearArray = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size);
    };

    getHead = () => this.head;
    getTail = () => this.tail;
    getSize = () => this.size;
    returnArray = (): (T | undefined)[] => [...this.container];
    isEmpty = () => this.length === 0
}