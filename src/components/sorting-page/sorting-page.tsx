import React, { ChangeEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { setDelay, swap } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'

export interface IResultArray {
  number: number,
  state: ElementStates
}

export const SortingPage: React.FC = () => {

  const [resultArray, setResultArray] = useState<Array<IResultArray>>([]);
  const [isLoading, setIsLoading] = useState<string>("default");
  const [radioType, setRadioType] = useState<string>("selection");

  useEffect(() => {
    setResultArray(generateRandomArray())
  }, [])

  const onChangeTypeSorting = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioType((e.target as HTMLInputElement).value);
  };

  const newArrayHandler = (): void => {
    setResultArray([])
    setResultArray(generateRandomArray())
    console.log(resultArray);
  }

  const generateRandomArray = (min: number = 0, max: number = 100, minLength: number = 3, maxLength: number = 17): IResultArray[] => {
    const arrayLength = randomIntFromInterval(minLength, maxLength)

    let randomArray: IResultArray[] = []

    for (let i = 0; i < arrayLength; i++) {
      randomArray = [...randomArray, {
        number: randomIntFromInterval(min, max),
        state: ElementStates.Default
      }]
    }

    return randomArray
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const sortHandler = async (direction: string): Promise<void> => {
    setIsLoading(direction)
    if (radioType === 'selection') {
      setResultArray(await onSelectionSort(resultArray, direction));
    } else {
      setResultArray(await onBubbleSort(resultArray, direction));
    }
  }

  const onSelectionSort = async (arr: IResultArray[], direction: string): Promise<IResultArray[]> => {
    for (let i = 0; i < arr.length; i++) {
      let currentIndex = i;
      arr[currentIndex].state = ElementStates.Changing;

      for (let k = i + 1; k < arr.length; k++) {
        arr[k].state = ElementStates.Changing;
        setResultArray([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);

        if (direction === 'ascending' ? arr[k].number < arr[currentIndex].number : arr[k].number > arr[currentIndex].number) {
          currentIndex = k;
          arr[currentIndex].state = i === currentIndex ? ElementStates.Changing : ElementStates.Default;
        }
        if (k !== currentIndex) {
          arr[k].state = ElementStates.Default;
        }
        setResultArray([...arr]);
      }

      swap(arr, currentIndex, i);
      arr[currentIndex].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setResultArray([...arr]);
    }

    setIsLoading('default');
    return arr;
  };

  const onBubbleSort = async (arr: IResultArray[], direction: string): Promise<IResultArray[]> => {
    for (let i = 0; i < arr.length; i++) {

      for (let k = 0; k < arr.length - i - 1; k++) {
        arr[k].state = ElementStates.Changing;
        arr[k + 1].state = ElementStates.Changing;

        setResultArray([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);

        if (direction === 'ascending' ? arr[k].number > arr[k + 1].number : arr[k].number < arr[k + 1].number) {
          const tmp = arr[k].number;
          arr[k].number = arr[k + 1].number;
          arr[k + 1].number = tmp
        }

        arr[k].state = ElementStates.Default;
        setResultArray([...arr]);
      }

      arr[arr.length - i - 1].state = ElementStates.Modified;
      setResultArray([...arr])
    }

    setIsLoading('default');
    return arr;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.sorting__form}>
        <div className={styles.sorting__form_group}>
          <RadioInput
            onChange={onChangeTypeSorting}
            label="Выбор"
            extraClass="mr-20"
            name={"sorting-type"}
            value={"selection"}
            checked={radioType === 'selection'}
            disabled={isLoading === Direction.Descending || isLoading === Direction.Ascending}
          />
          <RadioInput
            onChange={onChangeTypeSorting}
            label="Пузырек"
            name={"sorting-type"}
            value={"bubble"}
            checked={radioType === 'bubble'}
            disabled={isLoading === Direction.Descending || isLoading === Direction.Ascending}
          />
        </div>
        <div className={styles.sorting__form_group}>
          <Button
            onClick={() => sortHandler(Direction.Ascending)}
            isLoader={isLoading === Direction.Ascending}
            disabled={isLoading === Direction.Descending}
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="mr-6"
          />
          <Button
            onClick={() => sortHandler(Direction.Descending)}
            isLoader={isLoading === Direction.Descending}
            disabled={isLoading === Direction.Ascending}
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass="mr-40"
          />
          <Button
            disabled={isLoading !== "default"}
            text="Новый массив"
            onClick={newArrayHandler}
          />
        </div>
      </form>
      <ul className={styles.sorting__list}>
        {resultArray.map((item: IResultArray, index: number) => {
          return (
            <Column
              key={index}
              index={item.number}
              state={item.state}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
