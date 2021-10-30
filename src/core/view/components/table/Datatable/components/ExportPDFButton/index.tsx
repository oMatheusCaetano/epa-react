/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import * as Styled from './styles';
import { ButtonType } from '~/core/view/components';
import { ListDatasource, IListDatasourceParams } from '~/core/data/datasources/api';
import Table, { IDatatableColumn } from '../Table';

export interface IExportPDFButtonProps {
  columns: IDatatableColumn[];
  datasource: ListDatasource<any, any, any>;
  datasourceParams?: IListDatasourceParams<any, any>;
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
    content: () => componentRef.current,
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

      <div hidden>
        <div ref={componentRef}>
          <Table columns={columns} data={data} hideColumns={['Ações']} />
        </div>
      </div>
    </>
  );
};

export default ExportPDFButton;
