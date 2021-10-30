/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import * as Styled from './styles';
import { ButtonType } from '~/core/view/components';
import { ListDatasource, IListDatasourceParams } from '~/core/data/datasources/api';
import { IDatatableColumn } from '../Table';

interface ICsvHeadersData {
  label: string;
  key: string;
}

export interface IExportCSVButtonProps {
  columns: IDatatableColumn[];
  datasource: ListDatasource<any, any, any>;
  datasourceParams?: IListDatasourceParams<any, any>;
}

const ExportCSVButton: React.FC<IExportCSVButtonProps> = ({
  columns,
  datasource,
  datasourceParams,
}) => {
  const [loading, setLoading] = useState(false);
  const [csvHeaders, setCsvHeaders] = useState([] as ICsvHeadersData[]);
  const [csvData, setCsvData] = useState([] as any[]);

  async function handleData(done: any): Promise<void> {
    setLoading(true);
    const dsParams = datasourceParams ?? {};
    return datasource.exec({
      ...dsParams,
      onSuccess: async (data) => {
        await setCsvData(data as any[]);
      },
      onFinally: () => {
        done();
        setLoading(false);
      },
    });
  }

  function handleCsvHeaders() {
    const csvHeadersData = [];

    for (const column of columns) {
      if (column.name === 'Ações') continue;
      csvHeadersData.push({ label: column.name, key: column.data });
    }

    setCsvHeaders(csvHeadersData);
  }

  useEffect(handleCsvHeaders, [columns]);

  // async function handleCsvData(headers: any[], itemsData: any[]) {
  //   const csvDataData = [];

  //   for (const item of itemsData) {
  //     let obj = {};

  //     for (const header of headers) {
  //       obj = { ...obj, [header.key]: getPropertyValue(item, header.key) };
  //     }

  //     csvDataData.push(obj);
  //   }

  //   await setCsvData(csvDataData);
  // }

  // function getPropertyValue(object: any, propertyPath: string): any {
  //   const parts = propertyPath.split('.');
  //   let property = object;

  //   for (let i = 0; i < parts.length; i++) {
  //     if (!property || !Object.prototype.hasOwnProperty.call(property, parts[i])) {
  //       return '';
  //     }

  //     property = property[parts[i]];
  //   }

  //   return property;
  // }

  if (loading) {
    return (
      <Styled.Button styleAs={ButtonType.CSV} disabled>
        Excel
      </Styled.Button>
    );
  }

  return (
    <CSVLink
      data={csvData}
      headers={csvHeaders}
      asyncOnClick
      onClick={(_, done) => handleData(done)}
    >
      <Styled.Button styleAs={ButtonType.CSV} disabled={loading}>
        Excel
      </Styled.Button>
    </CSVLink>

  );
};

export default ExportCSVButton;
