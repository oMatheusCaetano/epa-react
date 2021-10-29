import React, { useEffect, useRef, useState } from 'react';
import { IDatatableColumn } from '../..';

import * as Styled from './styles';

export interface IHideColumnsButtonProps {
  columns: IDatatableColumn[];
  onSelect?: (column: IDatatableColumn) => void;
}

const HideColumnsButton: React.FC<IHideColumnsButtonProps> = ({ columns, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (elRef.current && !elRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <Styled.Container ref={elRef}>
      <Styled.Button onClick={() => setIsVisible(!isVisible)}>
        Ocultar Colunas
      </Styled.Button>

      <Styled.List hidden={!isVisible}>
        {columns.map((column, index) => (
          <Styled.ListItem
            key={`datatable-column--${index}--${column.name}`}
            column={column}
            onClick={() => (onSelect ? onSelect(column) : () => { /**  */ })}
          >
            {column.name}
          </Styled.ListItem>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default HideColumnsButton;
