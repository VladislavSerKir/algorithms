import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./Stack";

interface IIsLoading {
  addValue: boolean,
  removeValue: boolean,
  clearStack: boolean,
}

const newStack = new Stack<string>()

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  // const [resultArray, setResultArray] = useState<Array<number | string>>([]);
  const [resultArray, setResultArray] = useState<Array<string>>(newStack.returnArray());

  const [isLoading, setIsLoading] = useState<IIsLoading>({
    addValue: false,
    removeValue: false,
    clearStack: false,
  });
  const [currentCircle, setCurrentCircle] = useState<number>(0)

  console.log(resultArray);

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

    // setResultArray(resultArray => resultArray.slice(0, resultArray.length - 1))
    newStack.pop()
    setResultArray(newStack.returnArray())

    setIsLoading({
      ...isLoading,
      removeValue: false,
    });
  }

  const peak = () => {
    // return resultArray.length - 1
    return newStack.peak()
  }

  const clear = () => {
    setIsLoading({
      ...isLoading,
      clearStack: true,
    });

    newStack.clear()
    setResultArray(newStack.returnArray())
    // setResultArray([])
    setCurrentCircle(0);

    setIsLoading({
      ...isLoading,
      clearStack: false,
    });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={`stack__form`} onSubmit={(e) => e.preventDefault()}>
        <div className={`stack__form-group`}>
          <Input
            value={inputValue}
            onChange={onChange}
            isLimitText={true}
            maxLength={4}
            disabled={resultArray.length > 8}
          />
          <Button
            isLoader={isLoading.addValue}
            text="Добавить"
            onClick={() => push(inputValue)}
            disabled={!inputValue || resultArray.length > 8}
          />
          <Button
            isLoader={isLoading.removeValue}
            text="Удалить"
            onClick={() => pop()}
            disabled={resultArray.length < 1}
          />
        </div>
        <Button
          isLoader={isLoading.clearStack}
          text="Очистить"
          onClick={() => clear()}
          disabled={resultArray.length < 1}
        />
      </form>
      <ul className={`stack__list`}>
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
