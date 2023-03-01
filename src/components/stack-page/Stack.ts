interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => number;
    getSize: () => number;
    returnArray: () => T[];
}

export class Stack<T> implements IStack<T> {
    container: T[] = [];

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        this.container.pop()
    };

    peak = (): number => {
        return this.getSize() - 1;
    };

    getSize = (): number => {
        return this.container.length;
    }

    clear = () => {
        this.container = [];
    }

    returnArray = (): T[] => {
        return this.container;
    }
}