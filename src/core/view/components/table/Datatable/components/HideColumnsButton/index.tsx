import React, { useEffect, useRef, useState } from 'react';
import { IDatatableColumn } from '../Table';

import * as Styled from './styles';

export interface IHideColumnsButtonProps {
  columns: IDatatableColumn[];
  onSelect?: (column: IDatatableColumn) => void;
}

const HideColumnsButton: React.FC<IHideColumnsButtonProps> = ({ columns, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = ({ target }: any) => {
    if (elRef.current && !elRef.current.contains(target)) {
      setIsVisible(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEscKeyPressed = ({ key }: any) => {
    if (key === 'Escape') {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleEscKeyPressed, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscKeyPressed, true);
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
            key={index}
            column={column}
            onClick={onSelect ? () => onSelect(column) : undefined}
          >
            {column.name}
          </Styled.ListItem>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default HideColumnsButton;
