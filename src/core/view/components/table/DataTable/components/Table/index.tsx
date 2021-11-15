/* eslint-disable @typescript-eslint/no-explicit-any */
import { darken } from 'polished';
import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import * as S from './styles';

export interface TableProps {
  id?: string;
  columns: { title?: string; order?: 'ASC' | 'DESC'; onOrder?: (column?: string) => void; }[];
  data?: any[];
}

const Table: React.FC<TableProps> = ({ id, columns, data }) => {
  const theme = useTheme();

  return (
    <table className="table table-borderless">
      <thead className="table-light">
        <tr>
          {columns.map((item, index) => (
            <S.Th key={`${id}--tr--${index}`} onClick={() => (item.onOrder ? item.onOrder(item.title) : {})}>
              <div>
                <span>{item.title}</span>
                <span hidden={item.order !== 'DESC'}>
                  <FaAngleUp fill={darken(0.3, theme.colors.light)} />
                </span>
                <span hidden={item.order !== 'ASC'}>
                  <FaAngleDown fill={darken(0.3, theme.colors.light)} />
                </span>
              </div>
            </S.Th>

          ))}
        </tr>
      </thead>

      <tbody>
        {!!data?.length && data.map((item, index) => (
          <tr key={`${id}--tr--${index}`}>
            {!!item?.length && item.map((itemData: any, cIndex: number) => (
              <td key={`${id}--td--${cIndex}`}>{itemData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
