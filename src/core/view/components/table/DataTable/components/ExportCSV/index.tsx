/* eslint-disable consistent-return */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CSVLink } from 'react-csv';
import { renderToStaticMarkup } from 'react-dom/server';

import * as C from '~/core/view/components';

export interface ExportCSVProps {
  data: any[];
  hiddenColumns: string[];
}

const ExportCSV: React.FC<ExportCSVProps> = ({ data, hiddenColumns }) => {
  hiddenColumns = [...hiddenColumns, 'Ações'];

  function removeTags(str: string) {
    if ((str === null) || (str === '')) return '';
    str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  return (
    <CSVLink
      className="ms-2"
      target="_blank"
      data={data
        .map((item) => {
          const obj: any = {};

          for (const key in item.ds__data) {
            if (hiddenColumns.includes(key)) {
              continue;
            }

            if (typeof item.ds__data[key] === 'object') {
              obj[key] = removeTags(renderToStaticMarkup(item.ds__data[key]).toString());
              continue;
            }

            obj[key] = item.ds__data[key];
          }

          return obj;
        })}
    >
      <C.Button styleAs={C.ButtonStyle.CSV} />
    </CSVLink>
  );
};

export default ExportCSV;
