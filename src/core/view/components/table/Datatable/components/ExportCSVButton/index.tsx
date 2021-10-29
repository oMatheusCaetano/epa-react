import React from 'react';
import { useReactToPrint } from 'react-to-print';

import * as Styled from './styles';
import { ButtonType } from '~/core/view/components';

const ExportCSVButton: React.FC = () => {
  const handlePrint = useReactToPrint({ content: () => null });

  // function handleCsvHeaders() {
  //   const csvHeadersData = [];

  //   for (const column of columns) {
  //     if (column.name === 'Ações') continue;
  //     csvHeadersData.push({ label: column.name, key: column.data });
  //   }

  //   setCsvHeaders(csvHeadersData);
  //   return csvHeadersData;
  // }

  // function handleCsvData(headers: any[], itemsData: any[]) {
  //   const csvDataData = [];

  //   for (const item of itemsData) {
  //     let obj = {};

  //     for (const header of headers) {
  //       obj = { ...obj, [header.key]: getPropertyValue(item, header.key) };
  //     }

  //     csvDataData.push(obj);
  //   }

  //   setCsvData(csvDataData);
  //   return csvDataData;
  // }

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

  return (
    <Styled.Button styleAs={ButtonType.CSV}>
      Excel
    </Styled.Button>
  );
};

export default ExportCSVButton;
