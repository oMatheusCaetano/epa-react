/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import ReactDataTable, { TableStyles } from 'react-data-table-component';
import { DefaultTheme, useTheme } from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import JsxPdf from 'jsx-pdf';
import DateMoment, { IProps as DateMomentProps } from './subComponents/DateMoment';
import User, { IProps as UserProps } from './subComponents/User';

import * as Styled from './styles';
import PerPageSelector from './components/PerPageSelector';
import Pagination from './components/Pagination';
import ListApiDatasource, { IListApiDatasourceParams, IPaginatedResponse } from '~/core/data/datasources/api/list-api-datasource';
import { Button, ButtonType, Input, SectionContainer } from '~/core/view/components';
import HideColumnsButton from './components/HideColumnsButton';
import ExportPDFButton from './components/ExportPDFButton';
import ExportCSVButton from './components/ExportCSVButton';
import Table, { IDatatableColumn } from './components/Table';

interface ICsvHeadersData {
  label: string;
  key: string;
}

interface DatatableSubComponents {
  Date: React.FC<DateMomentProps>;
  User: React.FC<UserProps>;
}

export interface IProps {
  title?: string;
  datasource: ListApiDatasource<any, any, any>;
  columns: IDatatableColumn[];
  datasourceParams?: IListApiDatasourceParams<any, any>;
}

const Datatable: React.FC<IProps> & DatatableSubComponents = ({
  title,
  columns,
  datasource,
  datasourceParams,
}) => {
  const [pagination, setPagination] = useState({} as IPaginatedResponse<any>);
  const [cColumns, setCColumn] = useState([] as IDatatableColumn[]);
  const [data, setData] = useState([] as any[]);

  const [csvHeaders, setCsvHeaders] = useState([] as ICsvHeadersData[]);
  const [csvData, setCsvData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

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
      onFinally: () => {
        setLoading(false);
      },
    });
  };

  const COLUMNS = {
    toggleColumnsVisibility: (column: IDatatableColumn) => {
      const columnsVisibility = columns.map((item) => {
        if (item.name === column.name) item.hide = !item.hide;
        return item;
      });

      setCColumn(columnsVisibility);
    },

    init: () => {
      setCColumn(columns);
    },
  };

  useEffect(() => {
    send();
    COLUMNS.init();
  }, [datasourceParams?.filters]);

  return (
    <SectionContainer title={title}>
      <Styled.TableHeader>
        <aside>
          <span>Mostrar </span>
          <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span> Resultados</span>
        </aside>

        <Styled.TableHeaderRight>
          <Styled.TableHeaderSearch type="search" placeholder="Procurar por..." />

          <div>
            <HideColumnsButton columns={cColumns} onSelect={COLUMNS.toggleColumnsVisibility} />
            <ExportPDFButton
              datasource={datasource}
              datasourceParams={datasourceParams}
              columns={cColumns}
            />
            <ExportCSVButton />
          </div>
        </Styled.TableHeaderRight>
      </Styled.TableHeader>

      <Table columns={cColumns} data={data} />
    </SectionContainer>
  );
};

Datatable.Date = DateMoment;
Datatable.User = User;
export default Datatable;
// eslint-disable-next-line no-lone-blocks
{ /* <CSVLink data={csvData} headers={csvHeaders}>Download me</CSVLink>; */ }
