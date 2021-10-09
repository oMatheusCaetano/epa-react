/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDataTable, { TableProps } from 'react-data-table-component';

const DataTable: React.FC<TableProps<any>> = (props) => (
  <ReactDataTable {...props} />
);

export default DataTable;
// const columns = [
//   {
//     name: 'Title',
//     selector: (row: any) => row.title,
//   },
//   {
//     name: 'Year',
//     selector: () => 'Element 2',
//   },
// ];

// const data = [
//   {
//     id: 1,
//     title: 'Beetlejuice',
//     year: '1988',
//   },
//   {
//     id: 2,
//     title: 'Ghostbusters',
//     year: '1984',
//   },
// ];
