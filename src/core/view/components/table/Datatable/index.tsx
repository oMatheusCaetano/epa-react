/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Table, { TableColumn } from 'react-data-table-component';

interface IProps {
  data: object[];
  columns: TableColumn<any>[];
  total: number;
  perPage: number;
  onChangePage(page: number): void;
}

const Datatable: React.FC<IProps> = (props) => (
  <Table
    columns={props.columns}
    data={props.data}
    highlightOnHover
    pagination
    paginationServer
    paginationTotalRows={props.total}
    paginationPerPage={props.perPage}
    paginationComponentOptions={{
      noRowsPerPage: true,
    }}
    onChangePage={props.onChangePage}
  />
);

export default Datatable;
