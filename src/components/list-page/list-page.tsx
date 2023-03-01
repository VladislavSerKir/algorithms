import React, { FormEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

interface IIsLoading {
  addHead: boolean,
  addTail: boolean,
  addByIndex: boolean,
  removeHead: boolean,
  removeTail: boolean,
  removeByIndex: boolean,
}

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);

  const [currentCircle, setCurrentCircle] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<IIsLoading>({
    addHead: false,
    addTail: false,
    addByIndex: false,
    removeHead: false,
    removeTail: false,
    removeByIndex: false,
  });

  const [resultArray, setResultArray] = useState<Array<undefined | string>>([]);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  }

  const onChangeIndex = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const onAddHead = async () => { }

  const onAddTail = async () => { }

  const onAddValueByIndex = async () => { }

  const onRemoveHead = async () => { }

  const onRemoveTail = async () => { }

  const onRemoveValueByIndex = async () => { }

  return (
    <SolutionLayout title="Связный список">

      <form className={`pb-6 list-page__form`} onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={onChange}
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          extraClass={`mr-6 ${`list-page__input`}`}
        />
        <div className={`list-page__form-group`}>
          <Button
            onClick={onAddHead}
            text="Добавить в head"
            isLoader={isLoading.addHead}
            extraClass={`list-page__form-button_type_small`}
          />
          <Button
            onClick={onAddTail}
            text="Добавить в tail"
            extraClass={`list-page__form-button_type_small`}
            isLoader={isLoading.addTail}
          />
          <Button
            onClick={onRemoveHead}
            text="Удалить из head"
            extraClass={`list-page__form-button_type_small`}
            isLoader={isLoading.removeHead}
          />
          <Button
            onClick={onRemoveTail}
            text="Удалить из tail"
            extraClass={`list-page__form-button_type_small`}
            isLoader={isLoading.removeTail}
          />
        </div>
      </form>

      <form className={`list-page__form`} onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={onChangeIndex}
          isLimitText={false}
          type="number"
          maxLength={1}
          max={9}
          value={inputIndex}
          placeholder="Введите индекс"
          extraClass={`${`list-page__input`} mr-6`}
        />
        <div className={`list-page__form-group`}>
          <Button
            text="Добавить по индексу"
            extraClass={`list-page__form-button_type_big`}
            onClick={onAddValueByIndex}
            isLoader={isLoading.addByIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={`list-page__form-button_type_big`}
            onClick={onRemoveValueByIndex}
            isLoader={isLoading.removeByIndex}
          />
        </div>
      </form>

    </SolutionLayout>
  );
};
