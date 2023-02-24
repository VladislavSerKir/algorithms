import React, { FormEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

interface IIsLoading {
  addValue: boolean,
  removeValue: boolean,
  clearStack: boolean,
}

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<number | string>('');
  const [resultArray, setResultArray] = useState<Array<number | string>>([]);
  const [isLoading, setIsLoading] = useState<IIsLoading>({
    addValue: false,
    removeValue: false,
    clearStack: false,
  });
  const [currentCircle, setCurrentCircle] = useState<number>(0);
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  }

  const enqueue = async (item: string | number) => {
  }

  const dequeue = async () => {
  }

  const clear = () => {
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={`queue__form`} onSubmit={(e) => e.preventDefault()} data-cy="form">
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
            isLoader={isLoading.addValue}
            disabled={!inputValue || tail === 7}
          />
          <Button
            text="Удалить"
            isLoader={isLoading.removeValue}
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
              head={(index === head && resultArray.length !== 0) ? "head" : ""}
              tail={(index === tail - 1 && resultArray.length !== 0) ? "tail" : ""}
              state={index === currentCircle ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>

    </SolutionLayout>
  );
};
