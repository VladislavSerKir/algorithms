import { ElementStates } from '../../types/element-states';
import { reverseString } from './utils';
import { changeCircleType } from './utils';

describe('reverseString', () => {
    test('Четное количество', () => {
        expect(reverseString('abcd')).toEqual(['d', 'c', 'b', 'a']);
    })
    test('Нечетное количество', () => {
        expect(reverseString('abcde')).toEqual(['e', 'd', 'c', 'b', 'a']);
    })
    test('Один символ', () => {
        expect(reverseString('a')).toEqual(['a']);
    })
    test('Пустая строка', () => {
        expect(reverseString('')).toEqual([]);
    })
})

describe('changeCircleType', () => {
    test('Пройденное значение с начала', () => {
        expect(changeCircleType(0, 1, ['d', 'c', 'b', 'a'])).toEqual(ElementStates.Modified);
    })
    test('Пройденное значение с конца', () => {
        expect(changeCircleType(2, 3, ['d', 'c', 'b', 'a'])).toEqual(ElementStates.Modified);
    })
    test('Текущий кружок с начала', () => {
        expect(changeCircleType(0, 0, ['d', 'c', 'b', 'a'])).toEqual(ElementStates.Changing);
    })
    test('Текущий кружок с конца', () => {
        expect(changeCircleType(3, 0, ['d', 'c', 'b', 'a'])).toEqual(ElementStates.Changing);
    })
    test('Обычное состояние', () => {
        expect(changeCircleType(1, 0, ['d', 'c', 'b', 'a'])).toEqual(ElementStates.Default);
    })
})

