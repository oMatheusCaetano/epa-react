/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import * as Styled from './styles';

export interface IDatatableColumn {
  name: string;
  width?: string;
  data: string;
  hide?: boolean;
  selector: (row: any) => any;
}

export interface ITableProps {
  data?: any[];
  columns: IDatatableColumn[];
  hideColumns?: string[];
}

const Table: React.FC<ITableProps> = ({ data, columns, hideColumns }) => (
  <Styled.Table>
    <Styled.THead>
      <tr>
        {columns
          .filter((column) => !column.hide && !hideColumns?.includes(column.name))
          .map((column, index) => (
            <th key={`th--${column.name}--${index}`}>{column.name}</th>
          ))}
      </tr>
    </Styled.THead>

    <tbody>
      {data?.map((data, index) => (
        <tr key={`tr--${index}`}>
          {columns
            .filter((column) => !column.hide && !hideColumns?.includes(column.name))
            .map((column, index) => (
              <td
                style={{ width: column.width }}
                key={`td--${column.name}--${index}`}
                data-label={column.name}
              >
                {column.selector(data)}
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  </Styled.Table>
);

export default Table;
