import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

import * as Styled from './styles';

// TODO: Create outside click functionally

export interface ISelectOption {
  label: string;
  value: string | number;
  selected?: boolean;
  hide?: boolean;
  expanded?: boolean;
  bolded?: boolean;
  children?: ISelectOption[];
}

export interface IProps {
  name: string;
  multiple?: boolean;
  collapsible?: boolean;
  label?: string;
  errorMessage?: string;
  hideSearchInput?: boolean;
  options?: ISelectOption[];
  defaultValue?: string[];
  className?: string;
}

/**
 * @author Matheus Caetano <devmatheuscaetano@gmail.com>
 */
const Select: React.FC<IProps> = ({
  name,
  options = [],
  collapsible = false,
  multiple,
  label,
  hideSearchInput,
  errorMessage,
  defaultValue,
  className,
}) => {
  const { fieldName, registerField } = useField(name);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('Nada selecionado...');
  const [hiddenSelectValue, setHiddenSelectValue] = useState<string[]>([]);
  const [showList, setShowList] = useState<boolean>(false);

  /**
   * Closes the list if esc key is presses on keyboard.
   */
  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') setShowList(false);
    });
  }, []);

  /**
   * Register the field so a <Form> can get the <select> value.
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
   * Updates the selected items whenever the options prop changes.
   */
  useEffect(() => {
    if (defaultValue?.length) {
      setHiddenSelectValue(defaultValue);
      options = handleListDefaultValues(options);
      defaultValue = [];
    } else {
      setHiddenSelectValue(extractHiddenSelectInitialValue(options));
    }
    handleSelectedLabel();
  }, [options, multiple, collapsible, defaultValue]);

  const handleListDefaultValues = (items: ISelectOption[]) => {
    const data = items.map((item) => {
      if (item.selected) return item;

      if (defaultValue?.includes(String(item.value))) {
        item.selected = true;
        item.hide = false;
      }

      if (item.children?.length) {
        item.children = handleListDefaultValues(item.children);
      }

      return item;
    });

    return data;
  };

  /**
   * Defines the label that appear on the select button.
   * @recursive
   */
  const handleSelectedLabel = () => {
    if (!multiple) {
      for (const option of options ?? []) {
        if (option.selected) {
          setSelectedLabel(option.label);
          break;
        }
      }

      return;
    }

    const quantity = countSelectedItems(options);
    if (quantity > 0) setSelectedLabel(`${quantity} itens selecionados`);
    else setSelectedLabel('Nada selecionado...');
  };

  const countSelectedItems = (items: ISelectOption[], counter = 0) => {
    items.forEach((item) => {
      if (item.selected && !item.hide) counter++;
      if (item.children?.length) counter += countSelectedItems(item.children);
    });

    return counter;
  };

  /**
   * Extract the values of selected items.
   * @recursive
   */
  const extractHiddenSelectInitialValue = (items: ISelectOption[]) => {
    let values: string[] = [];

    for (const option of items) {
      if (option.selected && !option.hide) values.push(String(option.value));

      if (option.children && option.children.length) {
        values = values.concat(extractHiddenSelectInitialValue(option.children) as string[]);
      }
    }

    if (!multiple && values.length) {
      return [values[0]];
    }

    return values;
  };

  let alreadySelected = false; //! Do not use, Do not remove. Only used in renderListItems().
  /**
   * Creates the list of <li> elements that will be rendered inside the list.
   * @recursive
   */
  const renderListItems = (items: ISelectOption[], hide = false, tabIndex = 0) => {
    let listItems: JSX.Element[] = [];

    for (const option of items) {
      let className = '';

      if ((defaultValue?.includes(String(option.value))) || (!option.hide && !hide)) {
        if (multiple && option.selected) className = 'bg-info';

        if (!multiple && !alreadySelected && option.selected) {
          className = 'bg-info';
          alreadySelected = true;
        }

        listItems.push((
          <Styled.ListItem key={option.value} id={`${name}__list_item__${option.value}`} className={className}>
            {collapsible && (
              <Styled.ListItemButton type="button" onClick={() => { onListItemButtonClick(option, !option.expanded); }} disabled={!option.children?.length}>
                {option.expanded
                  ? <FaAngleDown fill={!option.children?.length ? 'lightgrey' : '#333'} />
                  : <FaAngleRight fill={!option.children?.length ? 'lightgrey' : '#333'} />}
              </Styled.ListItemButton>
            )}
            <Styled.ListItemLabel
              type="button"
              onClick={() => onListItemClick(option)}
              tabIndex={tabIndex}
              className={className.length ? 'text-white' : ''}
            >
              {option.bolded
                ? <strong className={className.length ? 'text-white' : ''}>{option.label}</strong>
                : option.label }
            </Styled.ListItemLabel>
          </Styled.ListItem>
        ));
      } else {
        option.hide = true;
      }

      if (option.children && option.children.length) {
        listItems = listItems.concat(renderListItems(
          option.children,
          collapsible && !option.expanded,
          tabIndex + 1,
        ));
      }
    }

    return listItems;
  };

  /**
   * Creates the list of <option> elements that will be rendered inside the hidden select.
   * @recursive
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

  /**
   * Expandes or collapses the item children
   * @recursive
   */
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
   * @recursive
   */
  const onListItemClick = (item?: ISelectOption, list?: ISelectOption[]): void => {
    const newValue = !item?.selected;
    if (multiple && item) {
      const liElement = document.getElementById(`${name}__list_item__${item.value}`);
      if (!newValue) liElement?.classList.remove('bg-info');
      else liElement?.classList.add('bg-info');
      item.selected = newValue;
      setHiddenSelectValue(extractHiddenSelectInitialValue(options));
      handleSelectedLabel();
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
    setHiddenSelectValue(extractHiddenSelectInitialValue(options));
    handleSelectedLabel();
    setShowList(false);
  };

  /**
   * Sets all displayed options as selected or not
   * @recursive
   */
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
    handleSelectedLabel();
  };

  /**
   * Search a specific text in a list of options
   * @recursive
   */
  const liveSearch = (list: ISelectOption[], inputValue: string) => {
    list.forEach((option) => {
      label = option.label.toLocaleLowerCase();
      if (label.includes(inputValue.toLocaleLowerCase())) {
        option.hide = false;
      } else option.hide = true;

      if (option.children?.length) liveSearch(option.children, inputValue);
    });

    setHiddenSelectValue(extractHiddenSelectInitialValue(options));
  };

  return (
    <Styled.Container className={`form-group ${className}`}>
      {label && <label className="form-label" htmlFor={fieldName}>{label}</label>}

      <Styled.SelectButton type="button" onClick={() => setShowList(!showList)}>
        {selectedLabel}
        <FaAngleDown className={showList ? 'upside-arrow--up' : 'upside-arrow--down'} />
      </Styled.SelectButton>

      <Styled.ListContainer className={showList ? 'list_container--active' : 'list_container--inactive'}>
        {!hideSearchInput && (
          <Styled.ListContainerInput type="search" className="form-control" onChange={({ target }) => liveSearch(options, target.value)} />
        )}

        {multiple && (
        <Styled.ButtonsContainer>
          <Styled.LeftButton type="button" onClick={() => selectAllDisplayed(options, true)}>
            Marcar todos
          </Styled.LeftButton>
          <Styled.RightButton type="button" onClick={() => selectAllDisplayed(options, false)}>
            Desmarcar todos
          </Styled.RightButton>
        </Styled.ButtonsContainer>
        )}

        <Styled.List>
          {renderListItems(options).map((option) => option)}
        </Styled.List>
      </Styled.ListContainer>

      <div className="ms-2 mt-1 mb-2">
        <small className="text-danger">{errorMessage}</small>
      </div>

      <select
        multiple
        hidden
        value={hiddenSelectValue}
        ref={selectRef}
        onChange={() => ''}
      >
        {renderHiddenSelectOptions(options).map((option) => option)}
      </select>
    </Styled.Container>
  );
};

export default Select;
