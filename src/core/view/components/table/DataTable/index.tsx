/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { QueryParams } from '~/core/data/datasources/GetDatasource';
import ListDatasource, { PaginatedResponse } from '~/core/data/datasources/ListDatasource';

// import { Container } from './styles';

export interface DataTableColumn {
  field?: string;
  title?: string;
  render?: (row: any, colIndex: number, rowIndex: number) => any;
}

export interface DataTableProps {
  datasource?: ListDatasource<any>;
  datasourceParams?: QueryParams;
  id?: string;
  className?: string;
  columns?: DataTableColumn[];
}

const DataTable: React.FC<DataTableProps> = ({
  id,
  className,
  datasource,
  datasourceParams,
  columns,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [perPage, setPerPage] = useState('10');
  const cColumns = columns;

  useEffect(() => {
    if (perPage !== 'ALL') {
      datasource?.exec({
        ...datasourceParams,
        pagination: {
          value: true,
          perPage: Number(perPage),
          page: 1,
        },
        onSuccess: (items) => {
          items = items as PaginatedResponse<any>;
          setData(items.data);
          console.log(items);
        },
      });
    } else {
      datasource?.exec({
        ...datasourceParams,
        onSuccess: (items) => {
          setData(items as any[]);
          console.log(items);
        },
      });
    }
  }, [perPage]);

  return (
    <div className={`w-100 ${className}`} id={id}>
      <header>
        <aside>
          <label>Mostrar</label>
          <select onChange={({ target }) => setPerPage(target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="ALL">Todos</option>
          </select>
          <label>resultados por página</label>
        </aside>
        <aside>
          <section>
            <input placeholder="Procurar por" />
          </section>
        </aside>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              {!!cColumns?.length && cColumns.map((item, index) => (
                <th key={`${id}--tr--${index}`}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!!data?.length && data.map((item, index) => (
              <tr key={`${id}--tr--${index}`}>
                {!!cColumns?.length && cColumns.map((column, cIndex) => (
                  <td key={`${id}--td--${cIndex}`}>
                    {column.render
                      ? column.render(item, index, cIndex)
                      : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer>
        <aside />
        <aside />
      </footer>
    </div>
  );
};

export default DataTable;
