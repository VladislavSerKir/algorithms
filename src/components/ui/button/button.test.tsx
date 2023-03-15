import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react'
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { Button } from "./button";

describe('Тестирование кнопки Button', () => {

    test('Кнопки без текста', () => {
        const button = renderer.create(<Button />).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Кнопки с текстом', () => {
        const button = renderer.create(<Button text='text' />).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Заблокированной кнопки', () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Кнопки с загрузкой', () => {
        const button = renderer.create(<Button isLoader={true} />).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Функции обратного вызова', () => {
        window.alert = jest.fn();
        render(<Button onClick={() => alert('callback')} text='text' />)
        const button = screen.getByText('text')
        fireEvent.click(button)
        expect(window.alert).toHaveBeenCalledWith('callback')
    });

})