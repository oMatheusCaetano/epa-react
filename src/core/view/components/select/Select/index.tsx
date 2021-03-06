/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState, memo } from 'react';
import { FaAngleDown, FaAngleRight, FaCheck } from 'react-icons/fa';

import * as C from '~/core/view/components';
import * as S from './styles';

export interface SelectOption {
  label: string;
  value: string | number | boolean;
  selected?: boolean;
  hide?: boolean;
  expanded?: boolean;
  bolded?: boolean;
  children?: SelectOption[];
}

export interface SelectProps {
  error?: string;
  label?: string;
  value?: string;
  className?: string;
  collapsible?: boolean;
  all?: boolean;
  options?: SelectOption[];
  multiple?: boolean;
  onChange?: (value: SelectOption | SelectOption[] | undefined) => void;
  onClick?: () => void;
  onBlur?: () => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  className,
  options = [] as SelectOption[],
  onChange,
  onClick,
  onBlur,
  collapsible,
  value,
  all,
  multiple,
}) => {
  const listRef = useRef<HTMLInputElement>(null);
  const [amountIndicator, setAmountIndicator] = useState('');
  const [hiddenInputValue, setHiddenInputValue] = useState<SelectOption | SelectOption[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [denyBlur, setDenyBlur] = useState(true);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [shownOptions, setShownOptions] = useState(options);

  useEffect(() => {
    if (!showList && onBlur && !denyBlur) onBlur();
    setDenyBlur(false);
  }, [showList]);
  useEffect(() => { handleAmountIndicatorMessage(); }, [hiddenInputValue]);
  useEffect(() => {
    handleValue(false);
    if (!multiple) {
      const item = getSingleSelectedOption(shownOptions);
      if (item) unselectAllBut(item, shownOptions);
    }
  }, []);
  useEffect(() => {
    inputValue?.length
      ? setShownOptions(handleLiveSearch(shownOptions, inputValue))
      : setShownOptions(options);
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleEscKeyPressed, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscKeyPressed, true);
    };
  }, []);
  useEffect(() => { handleInitialValue(); }, [options, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = ({ target }: any) => {
    if (listRef.current && !listRef.current.contains(target)) {
      setShowList(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEscKeyPressed = ({ key }: any) => {
    if (key === 'Escape') {
      setShowList(false);
    }
  };

  function onButtonClick() {
    setShowList(!showList);
    if (onClick) onClick();
  }

  async function handleInitialValue() {
    if (!value?.length) {
      setShownOptions(options);
      return;
    }

    const values = value.split(',');

    if (!values.length) {
      setShownOptions(options);
      return;
    }

    for (const value of values) {
      handleInitialValueRecursive(options, value);
    }

    setShownOptions(options);
    handleValue(false, options);
  }

  function handleInitialValueRecursive(optionsList: SelectOption[], value: string) {
    for (const option of optionsList) {
      if (String(option.value) === value) {
        option.selected = true;
      }
      if (option.children?.length) handleInitialValueRecursive(option.children, value);
    }
  }

  function handleLiveSearch(optionsList: SelectOption[], value: string) {
    for (const option of optionsList) {
      option.hide = !option.label.toLowerCase().includes(value.toLowerCase());
      if (option.children) handleLiveSearch(option.children, value);
    }

    return optionsList;
  }

  function handleAmountIndicatorMessage() {
    let amount = 0;

    if (isAllSelected) {
      setAmountIndicator('Todos');
      return;
    }

    if (multiple) {
      const list = hiddenInputValue as SelectOption[];
      amount = list.length;
    } else {
      const item = hiddenInputValue as SelectOption;
      amount = item?.value ? 1 : 0;
    }

    if (!multiple && amount) {
      const item = hiddenInputValue as SelectOption;
      setAmountIndicator(item.label);
      return;
    }

    const items = amount > 1 ? 'itens' : 'item';
    const selected = amount > 1 ? 'selecionados' : 'selecionado';
    setAmountIndicator(amount < 1 ? 'Nenhum item selecionado' : `${amount} ${items} ${selected}..`);
  }

  function handleValue(triggerOnChange = true, optionsList?: SelectOption[]) {
    const rValue = handleValueRecursion(optionsList ?? shownOptions);
    setHiddenInputValue(multiple ? rValue : rValue[0]);
    if (triggerOnChange && onChange) {
      if (multiple) onChange(rValue);
      else onChange(rValue?.length ? rValue[0] : undefined);
    }
  }

  function handleValueRecursion(optionsList: SelectOption[]) {
    let rValue = [] as SelectOption[];

    for (const option of optionsList) {
      if (option.selected) rValue.push(option);
      if (option.children?.length) rValue = rValue.concat(handleValueRecursion(option.children));
    }

    return rValue;
  }

  function handleOptionSelection(option: SelectOption) {
    option.selected = !option.selected;
    if (!option.selected) setIsAllSelected(false);
    const items = multiple ? shownOptions : unselectAllBut(option, shownOptions);
    setShownOptions([...items]);
    handleValue();
  }

  function unselectAllBut(option: SelectOption, optionsList: SelectOption[]) {
    for (const item of optionsList) {
      item.selected = item.value === option.value;
      if (item.children?.length) unselectAllBut(option, item.children);
    }

    return optionsList;
  }

  function getSingleSelectedOption(optionsList: SelectOption[]): SelectOption | null {
    for (const item of optionsList) {
      if (item.selected) return item;
      if (item.children?.length) return getSingleSelectedOption(item.children);
    }

    return null;
  }

  function selectAllVisible(optionsList: SelectOption[], value: boolean) {
    const items = selectAllVisibleRecursive(optionsList, value);
    setShownOptions([...items]);
    if (!value) setIsAllSelected(false);
    handleValue();
  }

  function selectAllVisibleRecursive(optionsList: SelectOption[], value: boolean) {
    for (const item of optionsList) {
      if (!item.hide) item.selected = value;
      if (item.children?.length) selectAllVisibleRecursive(item.children, value);
    }

    return optionsList;
  }

  function collapseOption(
    optionsList: SelectOption[],
    option: SelectOption,
    value: boolean,
    fullHierarchy = true,
  ) {
    collapseOptionRecursive(optionsList, option, value, fullHierarchy);
    setShownOptions([...shownOptions]);
  }

  function collapseOptionRecursive(
    optionsList: SelectOption[],
    option: SelectOption,
    value: boolean,
    fullHierarchy = true,
    ignoredDiff = true,
  ) {
    for (const item of optionsList) {
      if (ignoredDiff && item.value !== option.value) continue;
      item.expanded = value;
      if (!item.children?.length) continue;
      if (fullHierarchy) collapseOptionRecursive(item.children, option, value, false, false);
    }
  }

  function handleAllSelection() {
    handleAllSelectionRecursive(shownOptions, !isAllSelected);
    setIsAllSelected(!isAllSelected);
    setShownOptions([...shownOptions]);
    handleValue();
  }

  function handleAllSelectionRecursive(optionsList: SelectOption[], value: boolean) {
    for (const item of optionsList) {
      item.selected = value;
      item.expanded = collapsible ? value : true;

      if (item.children?.length) handleAllSelectionRecursive(item.children, value);
    }
  }

  function renderListOfOptions(
    optionsList: SelectOption[],
    tabIndex = 1,
  ): JSX.Element {
    return (
      <>
        {all && multiple && tabIndex === 1 && (
          <div>
            <S.ListItem tabIndex={tabIndex} onClick={handleAllSelection}>
              <div>
                <span>Todos</span>
                {isAllSelected && <FaCheck />}
              </div>
            </S.ListItem>
          </div>
        )}

        {optionsList.filter((option) => !option.hide).map((option, index) => (
          <div key={index}>
            <S.ListItem tabIndex={tabIndex}>
              {collapsible && (
                <S.CollapseButton
                  type="button"
                  onClick={() => collapseOption(optionsList, option, !option.expanded, false)}
                >
                  {option.expanded ? <FaAngleDown /> : <FaAngleRight /> }
                </S.CollapseButton>
              )}

              <div onClick={() => handleOptionSelection(option)}>
                <span>{option.label}</span>
                {option.selected && <FaCheck />}
              </div>
            </S.ListItem>

            {
              option.children
              && option.expanded
              && renderListOfOptions(option.children, tabIndex + 1)
            }
          </div>
        ))}
      </>
    );
  }

  return (
    <S.Container className={className} ref={listRef}>
      <C.Label label={label} />
      <S.SelectButton type="button" className="form-input-style" onClick={onButtonClick}>
        <span>{amountIndicator}</span>
        <FaAngleDown />
      </S.SelectButton>

      <S.ListContainer hidden={!showList}>
        <S.SearchInput
          type="text"
          className="form-input-style"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />

        <S.ButtonsContainer hidden={!multiple}>
          <S.Button type="button" onClick={() => selectAllVisible(shownOptions, true)}>
            Marcar Todos
          </S.Button>
          <S.Button type="button" onClick={() => selectAllVisible(shownOptions, false)}>
            Desmarcar Todos
          </S.Button>
        </S.ButtonsContainer>

        <S.List>
          {renderListOfOptions(shownOptions)}
        </S.List>
      </S.ListContainer>
      <C.SmallText error={error} />
    </S.Container>
  );
};

export default memo(Select);
