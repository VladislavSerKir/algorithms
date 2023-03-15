import { IResultArray } from "../components/sorting-page/sorting-page";

export const setDelay = (timer: number) => new Promise<void>(
    resolve => setTimeout(resolve, timer)
);

export const swapValue = (arr: string[], firstIndex: number, secondIndex: number): void => {
    const tmp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex - firstIndex];
    arr[secondIndex - firstIndex] = tmp
};

export const swap = (arr: IResultArray[], firstIndex: number, secondIndex: number): IResultArray[] => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr
};