/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Table from '~/core/view/components/table/DataTable/components/Table';
import * as C from '~/core/view/components';

export interface ExportPDFProps {
  id?: string;
  columns: { title?: string }[];
  data?: any[];
}

const ExportPDF: React.FC<ExportPDFProps> = ({ id, columns, data }) => {
  const tableToExportAsPdfRef = useRef(null);

  return (
    <>
      <C.Button
        styleAs={C.ButtonStyle.PDF}
        onClick={useReactToPrint({ content: () => tableToExportAsPdfRef.current })}
      />

      <div hidden>
        <div ref={tableToExportAsPdfRef}>
          <Table
            id={id}
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default ExportPDF;
