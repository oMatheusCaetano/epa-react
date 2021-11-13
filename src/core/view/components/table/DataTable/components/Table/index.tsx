/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface TableProps {
  id?: string;
  columns: { title?: string; }[];
  data?: any[];
}

const Table: React.FC<TableProps> = ({ id, columns, data }) => (
  <table cellPadding={0} cellSpacing={0} width="100%">
    <thead>
      <tr>
        {columns.map((item, index) => <th key={`${id}--tr--${index}`}>{item.title}</th>)}
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

export default Table;
