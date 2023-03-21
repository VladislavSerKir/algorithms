import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./Stack";
import styles from './stack-page.module.css'

interface IIsLoading {
  addValue: boolean,
  removeValue: boolean,
  clearStack: boolean,
}

const newStack = new Stack<string>()

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [resultArray, setResultArray] = useState<Array<string>>(newStack.returnArray());

  const [isLoading, setIsLoading] = useState<IIsLoading>({
    addValue: false,
    removeValue: false,
    clearStack: false,
  });
  const [currentCircle, setCurrentCircle] = useState<number>(0)

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  }

  const push = async (item: string) => {
    setIsLoading({
      ...isLoading,
      addValue: true,
    });
    newStack.push(item)
    setResultArray(newStack.returnArray())

    await setDelay(SHORT_DELAY_IN_MS);
    setCurrentCircle(currentCircle + 1);

    setIsLoading({
      ...isLoading,
      addValue: false,
    });
    setInputValue('');
  }

  const pop = async () => {
    setIsLoading({
      ...isLoading,
      removeValue: true,
    });

    setCurrentCircle(resultArray.length - 1);
    await setDelay(SHORT_DELAY_IN_MS);

    newStack.pop()
    setResultArray(newStack.returnArray())

    setIsLoading({
      ...isLoading,
      removeValue: false,
    });
  }

  const peak = () => {
    return newStack.peak()
  }

  const clear = () => {
    setIsLoading({
      ...isLoading,
      clearStack: true,
    });

    newStack.clear()
    setResultArray(newStack.returnArray())
    setCurrentCircle(0);

    setIsLoading({
      ...isLoading,
      clearStack: false,
    });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.stack__form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.stack__form_group}>
          <Input
            data-cy="stack-input"
            value={inputValue}
            onChange={onChange}
            isLimitText={true}
            maxLength={4}
            disabled={resultArray.length > 8}
          />
          <Button
            data-cy="stack-button"
            isLoader={isLoading.addValue}
            text="Добавить"
            onClick={() => push(inputValue)}
            disabled={!inputValue || resultArray.length > 8}
          />
          <Button
            data-cy="stack-delete"
            isLoader={isLoading.removeValue}
            text="Удалить"
            onClick={() => pop()}
            disabled={resultArray.length < 1}
          />
        </div>
        <Button
          data-cy="stack-clear"
          isLoader={isLoading.clearStack}
          text="Очистить"
          onClick={() => clear()}
          disabled={resultArray.length < 1}
        />
      </form>
      <ul className={styles.stack__list} data-cy="stack-circles">
        {resultArray.map((item, index: number) => {
          return (
            <Circle
              key={index}
              state={index === currentCircle ? ElementStates.Changing : ElementStates.Default}
              letter={`${item}`}
              head={peak() === index ? "top" : ''}
              index={index}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
