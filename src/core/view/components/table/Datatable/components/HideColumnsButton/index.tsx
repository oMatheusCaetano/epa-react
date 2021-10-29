import React, { useState } from 'react';
import { IDatatableColumn } from '../..';

import * as Styled from './styles';

export interface IHideColumnsButtonProps {
  columns: IDatatableColumn[];
}

const HideColumnsButton: React.FC<IHideColumnsButtonProps> = ({ columns }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Styled.Container>
      <Styled.Button onClick={() => setIsOpen(!isOpen)}>
        Ocultar Colunas
      </Styled.Button>

      <Styled.List hidden={!isOpen}>
        {columns.map((column, index) => (
          <Styled.ListItem key={`datatable-column--${index}--${column.name}`} column={column}>
            {column.name}
          </Styled.ListItem>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default HideColumnsButton;
