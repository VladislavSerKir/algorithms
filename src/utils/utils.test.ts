import { SHORT_DELAY_IN_MS } from "../constants/delays"
import { ElementStates } from "../types/element-states"
import { setDelay, swap } from "./utils"

const initialArray = [
    { number: 0, state: ElementStates.Default },
    { number: 1, state: ElementStates.Modified }
]

const resultArray = [
    { number: 1, state: ElementStates.Modified },
    { number: 0, state: ElementStates.Default }
]

describe('Тестирование утилитарных функций', () => {
    test('Установки задержки', () => {
        expect.assertions(1)
        const pendingPromise = setDelay(SHORT_DELAY_IN_MS)
            .then(resolved => {
                expect(resolved).toBe(undefined)
            })
        jest.useFakeTimers()

        return pendingPromise
    })
    test('Функции swap', () => {
        expect(swap(initialArray, 0, 1)).toEqual(resultArray)
    })
})