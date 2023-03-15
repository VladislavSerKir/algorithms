import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { onSelectionSort } from "./utils";
import { onBubbleSort } from "./utils";

const mockedSimpleArr = [{ number: 0, state: ElementStates.Default }]
const simpleArr = [{ number: 0, state: ElementStates.Modified }]

const mockedArr = [
    { number: 4, state: ElementStates.Default },
    { number: 7, state: ElementStates.Default },
    { number: 2, state: ElementStates.Default },
    { number: 0, state: ElementStates.Default },
    { number: 8, state: ElementStates.Default },
    { number: 9, state: ElementStates.Default },
    { number: 1, state: ElementStates.Default },
    { number: 3, state: ElementStates.Default },
    { number: 5, state: ElementStates.Default },
    { number: 6, state: ElementStates.Default }
]

const ascendedArr = [
    { number: 0, state: ElementStates.Modified },
    { number: 1, state: ElementStates.Modified },
    { number: 2, state: ElementStates.Modified },
    { number: 3, state: ElementStates.Modified },
    { number: 4, state: ElementStates.Modified },
    { number: 5, state: ElementStates.Modified },
    { number: 6, state: ElementStates.Modified },
    { number: 7, state: ElementStates.Modified },
    { number: 8, state: ElementStates.Modified },
    { number: 9, state: ElementStates.Modified }
]

const descendedArr = [
    { number: 9, state: ElementStates.Modified },
    { number: 8, state: ElementStates.Modified },
    { number: 7, state: ElementStates.Modified },
    { number: 6, state: ElementStates.Modified },
    { number: 5, state: ElementStates.Modified },
    { number: 4, state: ElementStates.Modified },
    { number: 3, state: ElementStates.Modified },
    { number: 2, state: ElementStates.Modified },
    { number: 1, state: ElementStates.Modified },
    { number: 0, state: ElementStates.Modified }
]

describe('onSelectionSort', () => {
    test('Пустого массива', () => {
        expect(onSelectionSort([], Direction.Ascending)).toEqual([]);
    })
    test('Сортировки по возрастанию', () => {
        expect(onSelectionSort([...mockedArr], Direction.Ascending)).toEqual(ascendedArr);
    })
    test('Сортировки по убыванию', () => {
        expect(onSelectionSort(mockedArr, Direction.Descending)).toEqual(descendedArr);
    })
    test('Сортировки одного элемента', () => {
        expect(onSelectionSort(mockedSimpleArr, Direction.Descending)).toEqual(simpleArr);
    })
})

describe('onBubbleSort', () => {
    test('Пустого массива', () => {
        expect(onBubbleSort([], Direction.Ascending)).toEqual([]);
    })
    test('Сортировки по возрастанию', () => {
        expect(onBubbleSort([...mockedArr], Direction.Ascending)).toEqual(ascendedArr);
    })
    test('Сортировки по убыванию', () => {
        expect(onBubbleSort(mockedArr, Direction.Descending)).toEqual(descendedArr);
    })
    test('Сортировки одного элемента', () => {
        expect(onBubbleSort(mockedSimpleArr, Direction.Descending)).toEqual(simpleArr);
    })
})