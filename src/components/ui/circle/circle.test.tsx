import render from 'react-test-renderer';
import '@testing-library/jest-dom'
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle', () => {

    test('Без буквы', () => {
        const circle = render.create(<Circle />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С буквами', () => {
        const circle = render.create(<Circle letter='text' />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С head', () => {
        const circle = render.create(<Circle head={"head"} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С react элементом в head', () => {
        const circle = render.create(<Circle head={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С tail', () => {
        const circle = render.create(<Circle tail={"tail"} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С react элементом в tail', () => {
        const circle = render.create(<Circle tail={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С индексом', () => {
        const circle = render.create(<Circle index={0} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('С пропом isSmall', () => {
        const circle = render.create(<Circle isSmall />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('В состоянии Default', () => {
        const circle = render.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('В состоянии Changing', () => {
        const circle = render.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    test('В состоянии Modified', () => {
        const circle = render.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

})