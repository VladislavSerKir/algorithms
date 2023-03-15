import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils";
import { IResultArray } from "./sorting-page";

export const onSelectionSort = (arr: IResultArray[] | [], direction: string): IResultArray[] => {
    for (let i = 0; i < arr.length; i++) {
        let currentIndex = i;
        arr[currentIndex].state = ElementStates.Changing;

        for (let k = i + 1; k < arr.length; k++) {
            arr[k].state = ElementStates.Changing;

            if (direction === 'ascending' ? arr[k].number < arr[currentIndex].number : arr[k].number > arr[currentIndex].number) {
                currentIndex = k;
                arr[currentIndex].state = i === currentIndex ? ElementStates.Changing : ElementStates.Default;
            }
            if (k !== currentIndex) {
                arr[k].state = ElementStates.Default;
            }
        }

        swap(arr, currentIndex, i);
        arr[currentIndex].state = ElementStates.Default;
        arr[i].state = ElementStates.Modified;
    }

    return arr;
};

export const onBubbleSort = (arr: IResultArray[], direction: string): IResultArray[] => {
    for (let i = 0; i < arr.length; i++) {

        for (let k = 0; k < arr.length - i - 1; k++) {
            arr[k].state = ElementStates.Changing;
            arr[k + 1].state = ElementStates.Changing;

            if (direction === 'ascending' ? arr[k].number > arr[k + 1].number : arr[k].number < arr[k + 1].number) {
                const tmp = arr[k].number;
                arr[k].number = arr[k + 1].number;
                arr[k + 1].number = tmp
            }

            arr[k].state = ElementStates.Default;
        }

        arr[arr.length - i - 1].state = ElementStates.Modified;
    }

    return arr;
}