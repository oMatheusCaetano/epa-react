/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';

import * as Styled from './styles';

export interface ISelectData {
  value?: string | number | number;
  label?: string;
  selected?: boolean;
  children?: ISelectData[];
}

export interface IProps {
  label?: string;
  multiple?: boolean;
  hideSearch?: boolean;
  expandable?: boolean;
  data?: ISelectData[];
}

const ManagementUnitSelect: React.FC<IProps> = ({
  label,
  multiple,
  data = [] as ISelectData[],
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [hideList, setHideList] = useState(false);
  const [displayedData, setDisplayedData] = useState([] as ISelectData[]);
  const [filterData, setFilterData] = useState([] as ISelectData[]);

  useEffect(() => {
    setDisplayedData(data);
    setFilterData(data);
  }, []);

  const filterDisplayedData = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.value?.length) {
      setDisplayedData(filterData);
      return;
    }

    setDisplayedData(filterData.filter((item) => item.label?.toLowerCase().includes(
      target.value?.toLowerCase(),
    )));
  };

  const displaySelectedItems = () => {
    setDisplayedData(displayedData.map((item) => {
      if (item.value?.toString() === selectRef.current?.value.toString()) {
        item.selected = !item.selected;
      } else {
        item.selected = false;
      }

      return item;
    }));
  };

  return (
    <Styled.Container>
      {label && <label className="form-label">{label}</label>}

      <Styled.SelectButton type="button" onClick={() => setHideList(!hideList)}>
        {data[0]?.label}
      </Styled.SelectButton>

      <Styled.SubContainer hidden={hideList}>
        <Styled.SearchInput
          type="search"
          className="form-control"
          onChange={filterDisplayedData}
        />

        <Styled.Actions hidden={!multiple}>
          <Styled.ActionsLeftButton>Marcar Todos</Styled.ActionsLeftButton>
          <Styled.ActionsRightButton>Desmarcar Todos</Styled.ActionsRightButton>
        </Styled.Actions>

        <Styled.List>
          {displayedData.map((item, index) => <Styled.ListItem className={item.selected ? 'bg-danger' : ''} key={index}>{item.label ?? ''}</Styled.ListItem>)}
        </Styled.List>
      </Styled.SubContainer>

      <select ref={selectRef} onChange={displaySelectedItems}>
        {data.map((item, index) => <option key={index} value={item.value ?? ''}>{item.label ?? ''}</option>)}
      </select>
    </Styled.Container>
  );
};

export default ManagementUnitSelect;
