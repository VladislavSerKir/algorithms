import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'

export const FibonacciPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<number | string>('');
  const [resultArray, setResultArray] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setResultArray([])
    getResultArray(+inputValue)
    setInputValue('')
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  }

  const getResultArray = async (inputValue: number) => {
    setIsLoading(true);
    const array = getInitialArray(inputValue);

    for (let i = 0; i < array.length; i++) {
      await setDelay(SHORT_DELAY_IN_MS);
      setResultArray(resultArray => [...resultArray, array[i]])
    }
    setIsLoading(false);
  }

  const getInitialArray = (n: number): number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
    }
    return arr
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.fibonacci__form} onSubmit={onSubmit}>
        <Input
          extraClass={styles.fibonacci__form_input}
          value={inputValue}
          onChange={onChange}
          type="number"
          isLimitText={true}
          maxLength={2}
          max={19}
          min={1}
          disabled={isLoading}
        />
        <Button
          type="submit"
          isLoader={isLoading}
          text="Рассчитать"
          disabled={1 > inputValue || inputValue > 19 || inputValue === ''}
        />
      </form>
      <ul className={styles.fibonacci__list} style={resultArray.length < 10 ?
        { justifyContent: 'center' } : { justifyContent: 'flex-start' }}>
        {resultArray && resultArray.map((item: number, index: number) => {
          return (
            <Circle
              key={index}
              letter={`${item}`}
              index={index}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
