export class LinkedListNode<T> {
    next: LinkedListNode<T> | null
    value: T

    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.next = (next === undefined ? null : next);
        this.value = value;
    }
}

interface ILinkedList<T> {
    append: (item: T) => void;
    prepend: (item: T) => void;
    addByIndex: (item: T, position: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    deleteByIndex: (position: number) => void;
    toArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
    head: LinkedListNode<T> | null;
    size: number;

    constructor(arr: T[]) {
        this.head = null;
        this.size = 0;
        arr.forEach(item => this.append(item))
    }

    toArray() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res
    }

    append(item: T) {
        const node = new LinkedListNode(item);

        if (this.head) {
            let curr = this.head;
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = node;
        } else {
            this.head = node;
        }

        this.size++;
    }

    prepend(item: T): void {
        const node = new LinkedListNode(item, this.head);

        this.head = node;
        this.size++;
    }

    deleteHead() {
        if (this.head) {
            let curr = this.head
            this.head = curr.next;
            this.size--;
        }
    }

    addByIndex(item: T, index: number) {
        if (index < 0 || index > this.size) {
            return;
        }

        if (index === 0 || !this.head) {
            this.append(item);
        } else {
            let curr = this.head;
            let currIndex = 0;

            const node = new LinkedListNode(item, curr.next);

            for (let i = currIndex; i <= index; i++) {
                if (currIndex === index) {
                    node.next = curr.next
                    curr.next = node
                } else {
                    curr.next = node;
                }
            }

            this.size++;
        }
    }

    deleteTail() {
        let curr;

        if (!this.head?.next) {
            this.head = null;
        } else {
            curr = this.head;
            while (curr.next?.next) {
                curr = curr.next;
            }
            curr.next = null;
        }

        this.size--;
    }

    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return;
        }

        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index) {
            if (curr) {
                curr = curr.next;
            }
            currIndex++
        }

        this.size--;
    }
}