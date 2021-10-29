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

interface ICsvHeadersData {
  label: string;
  key: string;
}

interface DatatableSubComponents {
  Date: React.FC<DateMomentProps>;
  User: React.FC<UserProps>;
}

export interface IDatatableColumn {
  name: string;
  width?: string;
  data: string;
  hide?: boolean;
  selector: (row: any) => any;
}

export interface IProps {
  title?: string;
  datasource: ListApiDatasource<any, any, any>;
  columns: IDatatableColumn[];
  datasourceParams?: IListApiDatasourceParams<any, any>;
}

const Datatable: React.FC<IProps> & DatatableSubComponents = ({
  title,
  datasource,
  columns,
  datasourceParams,
}) => {
  const [pagination, setPagination] = useState({} as IPaginatedResponse<any>);
  const [csvHeaders, setCsvHeaders] = useState([] as ICsvHeadersData[]);
  const [csvData, setCsvData] = useState([] as any[]);
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function handleCsvHeaders() {
    const csvHeadersData = [];

    for (const column of columns) {
      if (column.name === 'Ações') continue;
      csvHeadersData.push({ label: column.name, key: column.data });
    }

    setCsvHeaders(csvHeadersData);
    return csvHeadersData;
  }

  function handleCsvData(headers: any[], itemsData: any[]) {
    const csvDataData = [];

    for (const item of itemsData) {
      let obj = {};

      for (const header of headers) {
        obj = { ...obj, [header.key]: getPropertyValue(item, header.key) };
      }

      csvDataData.push(obj);
    }

    setCsvData(csvDataData);
    return csvDataData;
  }

  function getPropertyValue(object: any, propertyPath: string): any {
    const parts = propertyPath.split('.');
    let property = object;

    for (let i = 0; i < parts.length; i++) {
      if (!property || !Object.prototype.hasOwnProperty.call(property, parts[i])) {
        return '';
      }

      property = property[parts[i]];
    }

    return property;
  }

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

  useEffect(send, [datasourceParams?.filters]);

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
            <HideColumnsButton columns={columns} />

            <Styled.TableHeaderExportButton onClick={handlePrint} styleAs={ButtonType.PDF}>
              PDF
            </Styled.TableHeaderExportButton>
            <Styled.TableHeaderExportButton onClick={handlePrint} styleAs={ButtonType.CSV}>
              Excel
            </Styled.TableHeaderExportButton>
          </div>
        </Styled.TableHeaderRight>
      </Styled.TableHeader>

      <Styled.Table ref={componentRef}>
        <Styled.THead>
          <tr>
            {columns.map((column, index) => <th key={`th--${column.name}--${index}`}>{column.name}</th>)}
          </tr>
        </Styled.THead>
        <Styled.TBody>
          {data?.map((data, index) => (
            <tr key={`tr--${index}`}>
              {columns?.map((column, index) => (
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
        </Styled.TBody>
      </Styled.Table>
    </SectionContainer>
  );
};

Datatable.Date = DateMoment;
Datatable.User = User;
export default Datatable;
// eslint-disable-next-line no-lone-blocks
{ /* <CSVLink data={csvData} headers={csvHeaders}>Download me</CSVLink>; */ }
