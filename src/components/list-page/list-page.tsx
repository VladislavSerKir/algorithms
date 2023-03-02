import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./LinkedList";

interface IIsLoading {
  addHead: boolean,
  addTail: boolean,
  addByIndex: boolean,
  removeHead: boolean,
  removeTail: boolean,
  removeByIndex: boolean,
}

interface IDrawArr {
  topCircle: ITopCircle | null
  state: ElementStates,
  value: string,
}

interface ITopCircle {
  state: ElementStates,
  value: string,
  activeClass: 'topCircle' | 'bottomCircle';
}

const arr = ['0', '34', '8', '1']

const newLinkedList = new LinkedList<string | number>(arr)

const drawInitialArr = arr.map((item) => {
  return {
    topCircle: null,
    state: ElementStates.Default,
    value: item,
  }
})


export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<IIsLoading>({
    addHead: false,
    addTail: false,
    addByIndex: false,
    removeHead: false,
    removeTail: false,
    removeByIndex: false,
  });
  const [formDisabled, setFormDisabled] = useState<boolean>(false);

  const [resultArray, setResultArray] = useState<IDrawArr[]>(drawInitialArr);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  }

  const onChangeIndex = (e: FormEvent<HTMLInputElement>) => {
    setInputIndex(+e.currentTarget.value);
  }


  const onAddHead = async () => {
    setFormDisabled(true);
    setIsLoading({
      ...isLoading,
      addHead: true
    });

    newLinkedList.prepend(inputValue);

    if (resultArray.length > 0) {
      resultArray[0].topCircle = {
        state: ElementStates.Changing,
        value: inputValue,
        activeClass: 'topCircle',
      }
    }
    setResultArray([...resultArray]);

    await setDelay(SHORT_DELAY_IN_MS);
    resultArray[0] = {
      ...resultArray[0],
      topCircle: null
    }

    resultArray.unshift({
      ...resultArray[0],
      state: ElementStates.Modified,
      value: inputValue
    });
    setResultArray([...resultArray]);

    await setDelay(SHORT_DELAY_IN_MS);
    resultArray[0] = {
      ...resultArray[0],
      state: ElementStates.Default
    };
    setResultArray([...resultArray]);

    setIsLoading({
      ...isLoading,
      addHead: false
    });
    setInputValue('');
    setFormDisabled(false);
  }


  const onAddTail = async () => {
    setFormDisabled(true);
    setIsLoading({
      ...isLoading,
      addTail: true
    });

    newLinkedList.append(inputValue);

    resultArray[resultArray.length - 1] = {
      ...resultArray[resultArray.length - 1],
      topCircle: {
        state: ElementStates.Changing,
        value: inputValue,
        activeClass: 'topCircle',
      }
    }
    setResultArray([...resultArray]);

    await setDelay(SHORT_DELAY_IN_MS);
    resultArray[resultArray.length - 1] = {
      ...resultArray[resultArray.length - 1],
      topCircle: null
    }
    resultArray.push({
      state: ElementStates.Modified,
      value: inputValue,
      topCircle: null,
    })
    setResultArray([...resultArray]);

    await setDelay(SHORT_DELAY_IN_MS);
    resultArray[resultArray.length - 1] = {
      ...resultArray[resultArray.length - 1],
      state: ElementStates.Default
    };
    setResultArray([...resultArray]);

    setIsLoading({
      ...isLoading,
      addTail: false
    });
    setInputValue('');
    setFormDisabled(false);
  }


  const onAddValueByIndex = async () => {
    setFormDisabled(true);
    setIsLoading({
      ...isLoading,
      addByIndex: true
    });

    newLinkedList.addByIndex(inputValue, inputIndex);

    for (let i = 0; i <= inputIndex; i++) {
      resultArray[i] = {
        ...resultArray[i],
        state: ElementStates.Changing,
        topCircle: {
          state: ElementStates.Changing,
          value: inputValue,
          activeClass: "topCircle"
        }
      }

      await setDelay(SHORT_DELAY_IN_MS);
      setResultArray([...resultArray]);
      if (i > 0) {
        resultArray[i - 1] = {
          ...resultArray[i - 1],
          topCircle: null
        }
      }
      setResultArray([...resultArray]);
    }

    await setDelay(SHORT_DELAY_IN_MS);
    resultArray[inputIndex] = {
      ...resultArray[inputIndex],
      state: ElementStates.Default,
      topCircle: null
    }
    resultArray.splice(inputIndex, 0, {
      state: ElementStates.Modified,
      value: inputValue,
      topCircle: null
    })
    setResultArray([...resultArray]);

    resultArray[inputIndex] = {
      ...resultArray[inputIndex],
      state: ElementStates.Default
    }
    resultArray.forEach((item: IDrawArr) => {
      item.state = ElementStates.Default;
    })

    await setDelay(SHORT_DELAY_IN_MS);
    setResultArray([...resultArray]);
    setInputIndex(0);

    setIsLoading({
      ...isLoading,
      addByIndex: false
    });
    setInputValue('');
    setFormDisabled(false);
  }


  const onRemoveHead = async () => {
    setFormDisabled(true);
    setIsLoading({
      ...isLoading,
      removeHead: true
    });

    newLinkedList.deleteHead();

    resultArray[0] = {
      ...resultArray[0],
      value: '',
      topCircle: {
        state: ElementStates.Changing,
        value: '',
        activeClass: "bottomCircle"
      }
    }
    setResultArray([...resultArray]);


    await setDelay(SHORT_DELAY_IN_MS);
    resultArray.shift();
    setResultArray([...resultArray]);

    setIsLoading({
      ...isLoading,
      removeHead: false
    });
    setFormDisabled(false);
  }


  const onRemoveTail = async () => {
    setFormDisabled(true);
    setIsLoading({
      ...isLoading,
      removeTail: true
    });

    newLinkedList.deleteTail();

    resultArray[resultArray.length - 1] = {
      ...resultArray[resultArray.length - 1],
      value: '',
      topCircle: {
        state: ElementStates.Changing,
        value: '',
        activeClass: "bottomCircle"
      }
    }
    setResultArray([...resultArray]);

    await setDelay(SHORT_DELAY_IN_MS);
    resultArray.pop();
    setResultArray([...resultArray]);

    setIsLoading({
      ...isLoading,
      removeTail: false
    });
    setFormDisabled(false);
  }


  const onRemoveValueByIndex = async () => {
    setFormDisabled(true);
    setIsLoading({
      ...isLoading,
      removeByIndex: true
    });

    newLinkedList.deleteByIndex(inputIndex);

    for (let i = 0; i <= inputIndex; i++) {
      resultArray[i] = {
        ...resultArray[i],
        state: ElementStates.Changing,
      }
      await setDelay(SHORT_DELAY_IN_MS);
      setResultArray([...resultArray]);
    }
    resultArray[inputIndex] = {
      ...resultArray[inputIndex],
      value: '',
      topCircle: {
        state: ElementStates.Changing,
        value: '',
        activeClass: "bottomCircle"
      }
    }

    await setDelay(SHORT_DELAY_IN_MS);
    setResultArray([...resultArray]);
    resultArray.splice(inputIndex, 1)
    resultArray[inputIndex - 1] = {
      ...resultArray[inputIndex - 1],
      state: ElementStates.Modified,
      value: resultArray[inputIndex - 1].value,
      topCircle: null
    }

    await setDelay(SHORT_DELAY_IN_MS);
    setResultArray([...resultArray]);
    resultArray.forEach((item) => {
      item.state = ElementStates.Default;
    })

    await setDelay(SHORT_DELAY_IN_MS);
    setResultArray([...resultArray]);

    setIsLoading({
      ...isLoading,
      removeByIndex: false
    });
    setInputIndex(0);
    setFormDisabled(false);
  }

  return (
    <SolutionLayout title="Связный список">

      <form className={`pb-6 list-page__form`}>
        <Input
          onChange={onChange}
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          disabled={formDisabled}
          extraClass={`mr-6 list-page__input`}
        />
        <div className={`list-page__form-group`}>
          <Button
            onClick={onAddHead}
            text="Добавить в head"
            isLoader={isLoading.addHead}
            extraClass={`list-page__form-button_type_small`}
            disabled={formDisabled || inputValue.length === 0 || resultArray.length >= 9}
          />
          <Button
            onClick={onAddTail}
            text="Добавить в tail"
            extraClass={`list-page__form-button_type_small`}
            isLoader={isLoading.addTail}
            disabled={formDisabled || inputValue.length === 0 || resultArray.length >= 9}
          />
          <Button
            onClick={onRemoveHead}
            text="Удалить из head"
            extraClass={`list-page__form-button_type_small`}
            isLoader={isLoading.removeHead}
            disabled={formDisabled || resultArray.length <= 1}
          />
          <Button
            onClick={onRemoveTail}
            text="Удалить из tail"
            extraClass={`list-page__form-button_type_small`}
            isLoader={isLoading.removeTail}
            disabled={formDisabled || resultArray.length <= 1}
          />
        </div>
      </form>

      <form className={`list-page__form`}>
        <Input
          onChange={onChangeIndex}
          isLimitText={false}
          type="number"
          maxLength={1}
          max={9}
          value={inputIndex}
          disabled={formDisabled}
          placeholder="Введите индекс"
          extraClass={`list-page__input mr-6`}
        />
        <div className={`list-page__form-group`}>
          <Button
            text="Добавить по индексу"
            extraClass={`list-page__form-button_type_big`}
            onClick={onAddValueByIndex}
            isLoader={isLoading.addByIndex}
            disabled={formDisabled || inputValue.length === 0 || !inputIndex || inputIndex > resultArray.length - 1}
          />
          <Button
            text="Удалить по индексу"
            extraClass={`list-page__form-button_type_big`}
            onClick={onRemoveValueByIndex}
            isLoader={isLoading.removeByIndex}
            disabled={formDisabled || resultArray.length === 0 || !inputIndex || inputIndex > resultArray.length - 1 || inputIndex < 1}
          />
        </div>
      </form>

      <ul className={`list-page__list`}>
        {resultArray.map((item, index) => {
          return (
            <li className={`list-page__item`} key={index}>

              <Circle
                letter={item.value}
                state={item.state}
                head={!item.topCircle && index === 0 ? "head" : ""}
                tail={!item.topCircle && index === resultArray.length - 1 ? "tail" : ""}
                index={index}
                extraClass="mr-6 ml-6"
                isSmall={false}
              />

              {item.topCircle && (
                <Circle
                  state={item.topCircle.state}
                  letter={item.topCircle.value}
                  isSmall
                  extraClass={`list-page__circle ${item.topCircle.activeClass === 'topCircle' ? 'topCircle' : 'bottomCircle'}`}
                />
              )}

              {index < resultArray.length - 1 &&
                <ArrowIcon fill="#0032FF" />
              }

            </li>)
        })}
      </ul>

    </SolutionLayout>
  );
};
