/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

export interface ISelectOption {
  label: string;
  value: string | number;
  selected?: boolean;
  hide?: boolean;
  expanded?: boolean;
  children?: ISelectOption[];
}

export interface IProps {
  name: string;
  multiple?: boolean;
  collapsible?: boolean;
  options?: ISelectOption[];
}

const Select: React.FC<IProps> = ({ name, options = [], collapsible = false, multiple }) => {
  const { fieldName, registerField } = useField(name);

  const listRef = useRef<HTMLUListElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const [hiddenSelectValue, setHiddenSelectValue] = useState<string[] | number | string>(multiple ? [] : '0');

  /**
   * Updates the selected items whenever the options prop changes.
   * @author Matheus Caetano <devmatheuscaetano@gmail.com>
   */
  useEffect(() => { setHiddenSelectValue(extractHiddenSelectInitialValue(options)); }, [options]);

  /**
   * Register the field so a <Form> can get the <select> value.
   * @author Matheus Caetano <devmatheuscaetano@gmail.com>
   */
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (!multiple) return ref.value;

        const selectedOptions = [];
        for (const option of ref.options) {
          if (option.selected) selectedOptions.push(option.value);
        }

        return selectedOptions;
      },
    });
  }, [fieldName, registerField]);

  /**
   * Extract the values of selected items.
   * @recursive
   * @author Matheus Caetano <devmatheuscaetano@gmail.com>
   */
  const extractHiddenSelectInitialValue = (items: ISelectOption[], first = true) => {
    let values: string[] = [];

    for (const option of items) {
      if (option.selected && !option.hide) values.push(String(option.value));

      if (option.children && option.children.length) {
        values = values.concat(extractHiddenSelectInitialValue(option.children, false) as string[]);
      }
    }

    if (first && !multiple) {
      return values.length ? values[0] : 0;
    }

    return values;
  };

  let alreadySelected = false; //! Do not use, Do not remove. only used in renderListItems().
  /**
   * Creates the list of <li> elements that will be rendered inside the list.
   * @recursive
   * @author Matheus Caetano <devmatheuscaetano@gmail.com>
   */
  const renderListItems = (items: ISelectOption[], hide = false) => {
    let listItems: JSX.Element[] = [];

    for (const option of items) {
      let className = '';

      if (!option.hide && !hide) {
        if (multiple && option.selected) className = 'bg-info';

        if (!multiple && !alreadySelected && option.selected) {
          className = 'bg-info';
          alreadySelected = true;
        }

        listItems.push((
          <li key={option.value} id={`${name}__list_item__${option.value}`} className={className}>
            {collapsible && (
              <button type="button" onClick={() => { onListItemButtonClick(option, !option.expanded); }} disabled={!option.children?.length}>
                {option.expanded ? <FaAngleDown /> : <FaAngleRight />}
              </button>
            )}
            <button type="button" onClick={() => onListItemClick(option)}>
              {option.label}
            </button>
          </li>
        ));
      } else {
        option.hide = true;
      }

      if (option.children && option.children.length) {
        listItems = listItems.concat(renderListItems(
          option.children,
          collapsible && !option.expanded,
        ));
      }
    }

    return listItems;
  };

  /**
   * Creates the list of <option> elements that will be rendered inside the hidden select.
   * @recursive
   * @author Matheus Caetano <devmatheuscaetano@gmail.com>
   */
  const renderHiddenSelectOptions = (items: ISelectOption[]) => {
    let optionsList: HTMLOptionElement[] = [];

    for (const option of items) {
      optionsList.push(((
        <option key={option.value} value={option.value}>{option.label}</option>
      ) as unknown) as HTMLOptionElement);

      if (option.children && option.children.length) {
        optionsList = optionsList.concat(renderHiddenSelectOptions(option.children));
      }
    }

    return optionsList;
  };

  const onListItemButtonClick = (item: ISelectOption, expand: boolean, first = true) => {
    item.expanded = expand;

    if (first) item.hide = false;
    else item.hide = !expand;

    if (item.children?.length) {
      item.children.forEach((option) => { onListItemButtonClick(option, expand, false); });
    }

    if (first) {
      setHiddenSelectValue(extractHiddenSelectInitialValue(options));
    }
  };

  /**
   * Select or unselect a item from the list. also updates the hidden select
   * @author Matheus Caetano <devmatheuscaetano@gmail.com>
   */
  const onListItemClick = (item?: ISelectOption, list?: ISelectOption[]): void => {
    const newValue = !item?.selected;
    if (multiple && item) {
      const liElement = document.getElementById(`${name}__list_item__${item.value}`);
      if (!newValue) liElement?.classList.remove('bg-info');
      else liElement?.classList.add('bg-info');
      item.selected = newValue;
      setHiddenSelectValue(extractHiddenSelectInitialValue(options));
      return;
    }

    list = list || options;

    list.forEach((option) => {
      option.selected = false;
      const element = document.getElementById(`${name}__list_item__${option.value}`);
      if (element) element.classList.remove('bg-info');
      if (option.children && option.children.length) onListItemClick(undefined, option.children);
    });

    const liElement = document.getElementById(`${name}__list_item__${item?.value}`);
    if (!newValue) liElement?.classList.remove('bg-info');
    else liElement?.classList.add('bg-info');
    if (item) item.selected = newValue;
    const value = newValue && item ? item.value : 0;
    setHiddenSelectValue(value);
  };

  const selectAllDisplayed = (list: ISelectOption[], value: boolean) => {
    list.forEach((option) => {
      if (!option.hide) {
        option.selected = value;
      }

      if (option.children?.length) {
        selectAllDisplayed(option.children, value);
      }
    });

    setHiddenSelectValue(extractHiddenSelectInitialValue(options));
  };

  const search = (list: ISelectOption[], inputValue: string) => {
    list.forEach((option) => {
      if (option.label.includes(inputValue)) {
        option.hide = false;
      } else {
        option.hide = true;
      }

      if (option.children?.length) {
        search(option.children, inputValue);
      }
    });

    setHiddenSelectValue(extractHiddenSelectInitialValue(options));
  };

  return (
    <div>
      <input type="search" onChange={({ target }) => search(options, target.value)} />

      <div>
        <button type="button" onClick={() => selectAllDisplayed(options, true)}>
          Marcar todos
        </button>
        <button type="button" onClick={() => selectAllDisplayed(options, false)}>
          Desmarcar todos
        </button>
      </div>

      <ul ref={listRef}>
        {renderListItems(options).map((option) => option)}
      </ul>

      <select
        multiple={multiple}
        value={multiple ? hiddenSelectValue as string : hiddenSelectValue as string | number}
        ref={selectRef}
        onChange={() => ''}
      >
        {renderHiddenSelectOptions(options).map((option) => option)}
      </select>
    </div>
  );
};

export default Select;
