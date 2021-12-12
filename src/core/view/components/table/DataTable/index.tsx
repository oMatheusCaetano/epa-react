/* eslint-disable guard-for-in */
import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ListDatasource from '~/core/data/datasources/ListDatasource';
import { QueryParams } from '~/core/data/datasources/GetDatasource';

import User, { UserProps } from './subComponents/User';
import Date, { DateProps } from './subComponents/Date';
import Actions, { ActionsProps } from './subComponents/Actions';

import PerPageSelector from './components/PerPageSelector';
import LiveSearchInput from './components/LiveSearchInput';
import ExportPDF from './components/ExportPDF';
import ExportCSV from './components/ExportCSV';

import * as C from '~/core/view/components';
import * as S from './styles';

export interface DataTableColumn {
  title: string;
  sort?: 'ASC' | 'DESC';
  orderable?: boolean;
  render: (row: any) => string | boolean | number | React.ReactNode;
}

export interface DataTablePagination {
  total: number;
  page: number;
  from: number;
  to: number;
  lastPage: number;
  perPage: number;
}

export interface DataTableProps {
  datasource: ListDatasource<any>;
  datasourceParams?: QueryParams;
  columns: DataTableColumn[];
  id?: string;
}

interface DataTableSubComponents {
  User: React.FC<UserProps>;
  Date: React.FC<DateProps>;
  Actions: React.FC<ActionsProps>;
}

const DataTable: React.FC<DataTableProps> & DataTableSubComponents = (props) => {
  /** Define as colunas da tabela */
  const [columns, setColumns] = useState<DataTableColumn[]>(props.columns);

  /** Dados recuperados da API (Ainda não tratados para mostrar na tabela) */
  const [data, setData] = useState<any[]>([]);

  /** Texto da barra de busca */
  const [searchText, setSearchText] = useState('');

  /** Colunas da tabela que não devem ser mostradas */
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  /** Dados da paginação da tabela */
  const [pagination, setPagination] = useState<DataTablePagination>({
    total: 0,
    page: 1,
    from: 1,
    to: 10,
    lastPage: 1,
    perPage: 10,
  });

  /**
   * Carrega os dados da tabela, assim que o componente é criado
   * e quando quando os parâmetros do datasource mudarem
   */
  useEffect(() => {
    props.datasource.exec({
      ...props.datasourceParams,
      onSuccess: (items) => {
        setData(items as any[]);
      },
    });
  }, [props.datasourceParams]);

  /**
   * Extrai os dados que devem ser renderizados na tela
   */
  function handleData(items: any[]) {
    items = handleDs__Data(items);
    items = handleLiveSearchFilter(items);
    return handleSort(items);
  }

  /**
   * Filtra os dados de acordo com o texto
   * da barra de busca
   */
  function handleLiveSearchFilter(items: any[]) {
    return items.filter((item: any) => {
      for (const key in item.ds__data) {
        const includes = typeof item.ds__data[key] === 'object'
          ? removeTags(renderToStaticMarkup(item.ds__data[key]))
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
          : item
            .ds__data[key]
            ?.toString()
            .toLowerCase()
            .trim()
            .includes(searchText.toLowerCase().trim());

        if (includes) return true;
      }

      return false;
    });
  }

  /**
   * Adiciona informações nos dados (ds__data)
   * ds__data é um objeto que contém os dados que devem ser renderizados na tela
   */
  function handleDs__Data(items: any[]) {
    return items.map((item) => {
      item.ds__data = {};

      columns.forEach((column) => {
        item.ds__data[column.title] = column.render(item);
      });

      return item;
    });
  }

  function handleSort(items: any[]) {
    function sort(column: DataTableColumn, items: any[]) {
      if (!column.sort) return items;

      function compareASC(a: any, b: any) {
        if (a.ds__data[column.title] < b.ds__data[column.title]) return -1;
        if (a.ds__data[column.title] > b.ds__data[column.title]) return 1;
        return 0;
      }

      function compareDESC(a: any, b: any) {
        if (a.ds__data[column.title] > b.ds__data[column.title]) return -1;
        if (a.ds__data[column.title] < b.ds__data[column.title]) return 1;
        return 0;
      }

      return column.sort === 'DESC' ? items.sort(compareDESC) : items.sort(compareASC);
    }

    let itemsList = items;

    columns.forEach((column) => {
      if (column.orderable === false) return;
      itemsList = sort(column, itemsList);
    });

    return itemsList;
  }

  function onSort(column: DataTableColumn) {
    if (column.orderable === false) return;

    setColumns(columns.map((c) => {
      if (c.title === column.title) {
        c.sort = c.sort === 'ASC' ? 'DESC' : 'ASC';
      }

      return c;
    }));
  }

  function removeTags(str: string) {
    if ((str === null) || (str === '')) return '';
    str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  /**
   * Troca a página atual da tabela.
   */
  function goToPage(page: number) {
    setPagination({ ...pagination, page });
  }

  return (
    <div>
      <header className="my-3 d-flex align-items-center justify-content-between">
        <PerPageSelector
          total={handleData(data).length}
          onChange={(perPage) => setPagination({ ...pagination, perPage })}
        />

        <div className="d-flex align-items-center justify-content-between">
          <LiveSearchInput value={searchText} onChange={setSearchText} />

          <section className="ms-4 d-flex align-items-center">
            <ExportPDF
              id={props.id}
              columns={columns}
              hiddenColumns={hiddenColumns}
              data={handleData(data)}
            />
            <ExportCSV data={handleData(data)} hiddenColumns={hiddenColumns} />
          </section>
        </div>
      </header>

      <table className="table table-borderless">
        <thead className="table-light">
          <tr>
            {
              columns
                .filter((column) => !hiddenColumns.includes(column.title)) // Colunas escondidas
                .map((column) => (
                  <th
                    key={column.title}
                    onClick={() => onSort(column)}
                  >
                    <S.Th>
                      {column.title}
                      <div hidden={column.sort !== 'DESC'}>
                        <S.AngleUpIcon />
                      </div>

                      <div hidden={column.sort !== 'ASC'}>
                        <S.AngleDownIcon />
                      </div>
                    </S.Th>
                  </th>
                ))
            }
          </tr>
        </thead>

        <tbody>
          {handleData(data)
            .slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage)
            .map((item, index) => (
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

      <footer className="d-flex mt-3">
        <small>
          <span className="me-1">Mostrando de</span>
          {handleData(data).length ? ((pagination.page - 1) * pagination.perPage) + 1 : 0}
          <span className="mx-1">até</span>
          {(pagination.page * pagination.perPage) >= handleData(data).length
            ? handleData(data).length
            : (pagination.page * pagination.perPage)}
          <span className="mx-1">de</span>
          {handleData(data).length}
        </small>

        <C.Paginator
          className="ms-auto"
          onPageChange={goToPage}
          page={pagination.page}
          lastPage={Math.ceil(handleData(data).length / pagination.perPage)}
        />
      </footer>
    </div>
  );
};

DataTable.User = User;
DataTable.Date = Date;
DataTable.Actions = Actions;
export default DataTable;
