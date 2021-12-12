/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Table from '~/core/view/components/table/DataTable/components/Table';
import * as C from '~/core/view/components';

export interface ExportPDFProps {
  id?: string;
  columns: { title: string }[];
  hiddenColumns: string[];
  data: any[];
}

const ExportPDF: React.FC<ExportPDFProps> = ({ hiddenColumns, columns, data }) => {
  const tableToExportAsPdfRef = useRef(null);
  hiddenColumns = [...hiddenColumns, 'Ações'];

  return (
    <>
      <C.Button
        styleAs={C.ButtonStyle.PDF}
        onClick={useReactToPrint({ content: () => tableToExportAsPdfRef.current })}
      />

      <div hidden>
        <div ref={tableToExportAsPdfRef}>
          <table className="table table-borderless">
            <thead className="table-light">
              <tr>
                {
                columns
                  .filter((column) => !hiddenColumns.includes(column.title)) // Colunas escondidas
                  .map((column) => (
                    <th key={column.title}>
                      {column.title}
                    </th>
                  ))
              }
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {columns
                    .filter((column) => !hiddenColumns.includes(column.title))
                    .map((column) => (
                      <td key={column.title}>
                        {item.ds__data[column.title]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ExportPDF;
