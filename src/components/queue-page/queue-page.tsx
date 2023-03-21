import React, { FormEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./Queue";
import styles from './queue-page.module.css'

interface IIsLoading {
  enqueue: boolean,
  dequeue: boolean,
  clearStack: boolean,
}

const newQueue = new Queue<string>(7)

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [currentCircle, setCurrentCircle] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<IIsLoading>({
    enqueue: false,
    dequeue: false,
    clearStack: false,
  });

  const [resultArray, setResultArray] = useState<Array<undefined | string>>(newQueue.returnArray());
  const [head, setHead] = useState<number>(newQueue.getHead());
  const [tail, setTail] = useState<number>(newQueue.getTail());

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

  const clear = () => {
    setIsLoading({
      ...isLoading,
      clearStack: true
    });
    newQueue.clearArray();
    setHead(newQueue.getHead());
    setTail(newQueue.getTail());
    setResultArray(newQueue.returnArray());
    setIsLoading({
      ...isLoading,
      clearStack: false
    });
  }

  const enqueue = async (item: string) => {
    setIsLoading({
      ...isLoading,
      enqueue: true
    })

    newQueue.enqueue(item);
    setResultArray(newQueue.returnArray());
    setCurrentCircle(tail % newQueue.getSize());
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrentCircle('');
    setTail(newQueue.getTail());
    await setDelay(SHORT_DELAY_IN_MS);

    setIsLoading({
      ...isLoading,
      enqueue: false
    })
    setInputValue('')
  }

  const dequeue = async () => {
    setIsLoading({
      ...isLoading,
      dequeue: true
    })
    if (!newQueue.isEmpty()) {
      newQueue.dequeue();
      setResultArray(newQueue.returnArray());
      setCurrentCircle((head & newQueue.getSize()));
      await setDelay(SHORT_DELAY_IN_MS);
      setHead(newQueue.getHead());
      setCurrentCircle('');
      await setDelay(SHORT_DELAY_IN_MS);
    }
    setIsLoading({
      ...isLoading,
      dequeue: false
    })
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.queue__form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.queue__form_group}>
          <Input
            data-cy="queue-input"
            onChange={onChange}
            isLimitText={true}
            maxLength={4}
            value={inputValue}
          />
          <Button
            data-cy="queue-button"
            onClick={() => enqueue(inputValue)}
            text="Добавить"
            isLoader={isLoading.enqueue}
            disabled={!inputValue || tail === 7}
          />
          <Button
            data-cy="queue-delete"
            text="Удалить"
            isLoader={isLoading.dequeue}
            onClick={() => dequeue()}
            disabled={(head === 0 && tail === 0)}
          />
        </div>
        <Button
          data-cy="queue-clear"
          onClick={() => clear()}
          text="Очистить"
          isLoader={isLoading.clearStack}
          disabled={(head === 0 && tail === 0)}
        />
      </form>
      <ul className={styles.queue__list}>
        {resultArray.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item !== '' ? item : ''}
              index={index}
              state={index === currentCircle ? ElementStates.Changing : ElementStates.Default}
              head={(!newQueue.isEmpty() && index === head) ? "head" : ""}
              tail={(!newQueue.isEmpty() && index === tail - 1) ? "tail" : ""}
            />)
        })}
      </ul>

    </SolutionLayout>
  );
};
