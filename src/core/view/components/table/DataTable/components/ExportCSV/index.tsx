/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CSVLink } from 'react-csv';

import * as C from '~/core/view/components';

export interface ExportCSVProps {
  data?: any[];
}

const ExportCSV: React.FC<ExportCSVProps> = ({ data }) => (
  <CSVLink
    className="ms-2"
    data={data ?? []}
    target="_blank"
  >
    <C.Button styleAs={C.ButtonStyle.CSV} />
  </CSVLink>
);

export default ExportCSV;
