import { ElementStates } from "../../types/element-states";
import { swapValue } from "../../utils/utils";

export const reverseString = (inputValue: string) => {
    const arrayOfLetters = inputValue.split('');

    for (let i = 0; i < arrayOfLetters.length; i++) {
        if (i < Math.floor(arrayOfLetters.length / 2)) {
            swapValue(arrayOfLetters, i, arrayOfLetters.length - 1);
        }
    }

    return arrayOfLetters;
}

export const changeCircleType = (currIndex: number, currentCircle: number, arr: Array<string | number>) => {
    if (currIndex < currentCircle || currIndex > arr.length - 1 - currentCircle) {
        return ElementStates.Modified
    }
    if (currIndex === currentCircle || currIndex === arr.length - 1 - currentCircle) {
        return ElementStates.Changing
    }
    return ElementStates.Default
}