import React, { FormEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { setDelay, swapValue } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css'

export const StringComponent: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [resultArray, setResultArray] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCircle, setCurrentCircle] = useState<number>(0)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setCurrentCircle(0);
    reverseString(inputValue);
    setInputValue('');
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const trimedString = e.currentTarget.value.trim();
    setInputValue(trimedString);
  }

  const reverseString = async (inputValue: string): Promise<string[]> => {
    const arrayOfLetters = inputValue.split('');
    setIsLoading(true);
    setResultArray(arrayOfLetters);
    await setDelay(DELAY_IN_MS);

    for (let i = 0; i < arrayOfLetters.length; i++) {
      if (i < Math.floor(arrayOfLetters.length / 2)) {
        swapValue(arrayOfLetters, i, arrayOfLetters.length - 1);
        setCurrentCircle(circle => circle + 1);
        setResultArray(arrayOfLetters);
        await setDelay(DELAY_IN_MS);
      }
    }

    setCurrentCircle(circle => circle + 1);
    setIsLoading(false);

    return resultArray;
  }

  const changeCircleType = (currIndex: number, currentCircle: number, arr: Array<string | number>) => {
    if (currIndex < currentCircle || currIndex > arr.length - 1 - currentCircle) {
      return ElementStates.Modified
    }
    if (currIndex === currentCircle || currIndex === arr.length - 1 - currentCircle) {
      return ElementStates.Changing
    }
    return ElementStates.Default
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          extraClass={styles.form__input}
          onChange={onChange}
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          disabled={isLoading}
        />
        <Button
          isLoader={isLoading}
          text="Развернуть"
          type="submit"
          disabled={!inputValue}
        />
      </form>
      <ul className={styles.list}>
        {resultArray.map((item: string, index: number) => {
          return (
            <Circle
              key={index}
              state={changeCircleType(index, currentCircle, resultArray)}
              letter={item}
              index={index + 1}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
