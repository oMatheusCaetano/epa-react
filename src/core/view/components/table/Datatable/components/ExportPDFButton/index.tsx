/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import * as Styled from './styles';
import { ButtonType } from '~/core/view/components';
import ListApiDatasource, { IListApiDatasourceParams } from '~/core/data/datasources/api/list-api-datasource';
import Table, { IDatatableColumn } from '../Table';

export interface IExportPDFButtonProps {
  columns: IDatatableColumn[];
  datasource: ListApiDatasource<any, any, any>;
  datasourceParams?: IListApiDatasourceParams<any, any>;
}

const ExportPDFButton: React.FC<IExportPDFButtonProps> = ({
  datasource,
  datasourceParams,
  columns,
}) => {
  const componentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as any[]);
  const handlePrint = useReactToPrint({
    onBeforeGetContent: handleData,
    content: () => {
      if (componentRef.current) {
        const component = componentRef.current as HTMLDivElement;
        const clone = component.cloneNode(true) as HTMLDivElement;
        clone.hidden = false;
        return clone;
      }

      return componentRef.current;
    },
  });

  async function handleData(): Promise<void> {
    setLoading(true);
    const dsParams = datasourceParams ?? {};
    return datasource.exec({
      ...dsParams,
      onSuccess: (data) => { setData(data as any[]); },
      onFinally: () => { setLoading(false); },
    });
  }

  return (
    <>
      <Styled.Button onClick={handlePrint} styleAs={ButtonType.PDF} disabled={loading}>
        PDF
      </Styled.Button>

      <div ref={componentRef} hidden>
        <Table columns={columns} data={data} hideColumns={['Ações']} />
      </div>
    </>
  );
};

export default ExportPDFButton;
