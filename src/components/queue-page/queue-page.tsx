import React, { FormEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

interface IIsLoading {
  enqueue: boolean,
  dequeue: boolean,
  clearStack: boolean,
}

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<number | string>('');
  const [resultArray, setResultArray] = useState<Array<number | string>>([]);
  const [isLoading, setIsLoading] = useState<IIsLoading>({
    enqueue: false,
    dequeue: false,
    clearStack: false,
  });
  const [currentCircle, setCurrentCircle] = useState<number | string>('');
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);

  useEffect(() => {
    generateInitialArray(7)
  }, [])


  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  }

  const generateInitialArray = (arrayLength: number): Array<string> => {
    let initialArray: Array<string> = []
    for (let i = 0; i < arrayLength; i++) {
      initialArray = [...initialArray, '']
    }
    setResultArray(initialArray)
    return initialArray
  }

  const enqueue = async (item: string | number) => {
    setIsLoading({
      ...isLoading,
      enqueue: true
    })
    // if (resultArray.length >= 7) {
    //   return
    // }
    setCurrentCircle(tail)
    await setDelay(SHORT_DELAY_IN_MS);
    setResultArray(resultArray => {
      resultArray.splice(tail, 1, item)
      return [...resultArray]
    })


    setCurrentCircle(-1)
    setTail(tail => tail + 1)
    await setDelay(SHORT_DELAY_IN_MS);

    setIsLoading({
      ...isLoading,
      enqueue: false
    })
    console.log(resultArray);
    setResultArray(resultArray => [...resultArray])
    setInputValue('')
  }

  const dequeue = async () => {
    if (resultArray[head] !== '') {
      setIsLoading({
        ...isLoading,
        dequeue: true
      })

      // if (head !== 6) {
      setCurrentCircle(head)
      // }
      await setDelay(SHORT_DELAY_IN_MS);
      setResultArray(resultArray => {
        resultArray.splice(head, 1, '')
        console.log(resultArray);
        return [...resultArray]
      })


      // setCurrentCircle(-1)
      // setHead(head => head + 1 === 7 ? 0 : head + 1)
      // if (head === 6) {
      if (head === 6) {

        // setCurrentCircle(head)
        setCurrentCircle(-1)
      } else {
        setHead(head => head + 1)
        setCurrentCircle(-1)
      }


      await setDelay(SHORT_DELAY_IN_MS);

      setIsLoading({
        ...isLoading,
        dequeue: false
      })
    }

  }

  const clear = () => {
    setIsLoading({
      ...isLoading,
      clearStack: true
    })
    setHead(0)
    setTail(0)
    generateInitialArray(7)
    setCurrentCircle('')
    setIsLoading({
      ...isLoading,
      clearStack: false
    })
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={`queue__form`} onSubmit={(e) => e.preventDefault()}>
        <div className={`queue__form-group`}>
          <Input
            onChange={onChange}
            isLimitText={true}
            maxLength={4}
            value={inputValue}
          />
          <Button
            onClick={() => enqueue(inputValue)}
            text="Добавить"
            isLoader={isLoading.enqueue}
            disabled={!inputValue || tail === 7}
          />
          <Button
            text="Удалить"
            isLoader={isLoading.dequeue}
            onClick={() => dequeue()}
            disabled={resultArray.length === 0}
          />
        </div>
        <Button
          onClick={() => clear()}
          text="Очистить"
          isLoader={isLoading.clearStack}
          disabled={(head === 0 && tail === 0)}
        />
      </form>
      <ul className={`queue__list`}>
        {resultArray.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={`${item}`}
              index={index}
              head={(index === head && resultArray.length !== 0 && tail > 0) ? "head" : ""}
              tail={(index === tail - 1 && resultArray.length !== 0 && item !== '') ? "tail" : ""}
              state={index === currentCircle ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>

    </SolutionLayout>
  );
};
