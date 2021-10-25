/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ReactDataTable, { TableStyles } from 'react-data-table-component';
import { DefaultTheme, useTheme } from 'styled-components';
import DateMoment, { IProps as DateMomentProps } from './subComponents/DateMoment';
import User, { IProps as UserProps } from './subComponents/User';

import * as Styled from './styles';
import PerPageSelector from './components/PerPageSelector';
import Pagination from './components/Pagination';
import ListApiDatasource, { IListApiDatasourceParams, IPaginatedResponse } from '~/core/data/datasources/api/list-api-datasource';

interface DatatableSubComponents {
  Date: React.FC<DateMomentProps>;
  User: React.FC<UserProps>;
}

export interface IPropsColumn {
  name: string;
  width?: string;
  selector: (row: any) => any;
}

export interface IProps {
  datasource: ListApiDatasource<any, any, any>;
  columns: IPropsColumn[];
  datasourceParams?: IListApiDatasourceParams<any, any>;
}

/**
 * @link https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page
 */
const Datatable: React.FC<IProps> & DatatableSubComponents = ({
  datasource,
  columns,
  datasourceParams,
}) => {
  const theme = useTheme();
  const [pagination, setPagination] = useState({} as IPaginatedResponse<any>);
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const customStyles: TableStyles = {
    headRow: {
      style: {
        background: theme.colors.light,
        border: 'none',
        borderRadius: 7,
        marginBottom: 4,
      },
    },
    cells: {
      style: {
        border: 'none',
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
    rows: {
      style: {
        border: 'none',
        '&:not(:last-of-type)': {
          border: 'none',
        },
      },
      selectedHighlightStyle: {
        style: {
          border: 'none',
        },
      },
      denseStyle: {
        style: {
          border: 'none',
        },
      },
      highlightOnHoverStyle: {
        style: {
          border: 'none',
        },
      },
      stripedStyle: {
        style: {
          border: 'none',
        },
      },
    },
  };

  const send = (itemsPerPage?: number, page = 1) => {
    setLoading(true);
    const dsParams = datasourceParams ?? {};
    datasource.exec({
      ...dsParams,
      pagination: { perPage: itemsPerPage ?? pagination.perPage, page },
      onSuccess: (data) => {
        data = data as IPaginatedResponse<any>;
        setData(data.data);
        setPagination({ ...data, data: [] });
      },
      onFinally: () => { setLoading(false); },
    });
  };

  useEffect(send, []);

  return (
    <div>
      <Styled.Header>
        <PerPageSelector loading={loading} onChange={send} />
      </Styled.Header>

      <ReactDataTable
        dense
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

      <Styled.Footer>
        <span>
          Mostrando de {pagination.from} até {pagination.to} de {pagination.total} registros
        </span>

        <Pagination
          disabled={loading}
          lastPage={pagination.lastPage}
          currentPage={pagination.currentPage}
          onPageChange={(targetPage) => send(undefined, targetPage)}
        />
      </Styled.Footer>
    </div>
  );
};

Datatable.Date = DateMoment;
Datatable.User = User;
export default Datatable;
