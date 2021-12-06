/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { QueryParams } from '~/core/data/datasources/GetDatasource';
import ListDatasource from '~/core/data/datasources/ListDatasource';

import User, { UserProps } from './subComponents/User';
import Date, { DateProps } from './subComponents/Date';
import Actions, { ActionsProps } from './subComponents/Actions';

import PerPageSelector from './components/PerPageSelector';
import LiveSearchInput from './components/LiveSearchInput';
import Table from './components/Table';
import ExportPDF from './components/ExportPDF';
import ExportCSV from './components/ExportCSV';

import * as C from '~/core/view/components';

interface DataTablePagination {
  total: number;
  page: number;
  from: number;
  to: number;
  lastPage: number;
  perPage: number;
}

export interface DataTableColumn {
  field?: string;
  title?: string;
  render?: (row: any) => string | boolean | number | React.ReactNode;
}

export interface DataTableProps {
  datasource?: ListDatasource<any>;
  datasourceParams?: QueryParams;
  id?: string;
  className?: string;
  columns?: DataTableColumn[];
}

interface DataTableSubComponents {
  User: React.FC<UserProps>;
  Date: React.FC<DateProps>;
  Actions: React.FC<ActionsProps>;
}

const DataTable: React.FC<DataTableProps> & DataTableSubComponents = ({
  id,
  className,
  datasource,
  datasourceParams,
  columns,
}) => {
  const [cachedData, setCachedData] = useState<any[]>([]);
  const [dataWithoutPagination, setDataWithoutPagination] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [liveSearch, setLiveSearch] = useState('');
  const [hiddenColumns] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    from: 1,
    to: 10,
    page: 1,
    perPage: 10,
  } as DataTablePagination);

  useEffect(() => {
    datasource?.exec({
      ...datasourceParams,
      onSuccess: (items) => {
        setCachedData(items as any[]);
        setData(handleData(items as any[]));
      },
    });
  }, [datasourceParams]);

  useEffect(() => {
    if (!cachedData.length) return;
    setData(handleData(cachedData));
  }, [liveSearch, pagination.page, pagination.perPage]);

  /**
   * Lida com os dados que devem ser renderizados.
   */
  function handleData(items = [] as any[]) {
    const data = handleOrder(handleLiveSearch(handleDataToRender(items)));
    setDataWithoutPagination(data);
    return handlePagination(data);
  }

  /**
   * Filtra os dados para pegar apenas os itens da página atual.
   */
  function paginate(perPage = 10, page = 1, items = [] as any[]) {
    return items.slice((page - 1) * perPage, page * perPage);
  }

  function handleOrder(items = [] as any[]) {
    //! Implementar lógica de sorting
    return items;
  }

  /**
   * Lida com a lógica da paginação.
   */
  function handlePagination(items = [] as any[]) {
    const toBase = pagination.page * pagination.perPage;

    setPagination({
      ...pagination,
      total: items.length,
      from: items.length ? ((pagination.page - 1) * pagination.perPage) + 1 : 0,
      to: toBase >= items.length ? items.length : toBase,
      lastPage: Math.ceil(items.length / pagination.perPage),
    });

    return paginate(pagination.perPage, pagination.page, items);
  }

  /**
   * Define quais dados devem ser renderizados.
   */
  function handleDataToRender(items = [] as any[]) {
    return items.map((item) => (
      handleHiddenColumns().map((column) => (column.render ? column.render(item) : ''))
    ));
  }

  /**
   * Define quais colunas devem ser renderizadas.
   */
  function handleHiddenColumns() {
    if (!columns?.length) return [];
    return columns.filter((column) => (
      column.title ? !hiddenColumns.includes(column.title) : column
    ));
  }

  /**
   * Filtra os dados de acordo com o live search
   * para pegar apenas os items que devem ser renderizados.
   */
  function handleLiveSearch(items = [] as any[]) {
    return items.filter((item) => item.findIndex((itemData: any) => (
      typeof itemData === 'object'
        ? renderToStaticMarkup(itemData)
          ?.toString()
          .toLowerCase()
          .includes(liveSearch.toLowerCase())
        : itemData
          ?.toString()
          .toLowerCase()
          .includes(liveSearch.toLowerCase()))) > -1);
  }

  /**
   * Troca a página atual da tabela.
   */
  function goToPage(page: number) {
    setPagination({ ...pagination, page });
  }

  return (
    <div className={`w-100 mt-2 ${className}`} id={id}>
      <header className="d-flex align-items-center justify-content-between mb-2">
        <PerPageSelector
          total={data.length}
          onChange={(perPage) => setPagination({ ...pagination, perPage })}
        />

        <aside className="d-flex align-items-center">
          <LiveSearchInput value={liveSearch} onChange={setLiveSearch} />

          <section className="ms-4 d-flex align-items-center">
            <ExportPDF id={id} columns={handleHiddenColumns()} data={dataWithoutPagination} />
            <ExportCSV data={dataWithoutPagination} />
          </section>
        </aside>
      </header>

      <main>
        <Table
          id={id}
          columns={handleHiddenColumns()}
          data={data}
        />

        <footer className="d-flex mt-3">
          <p>Mostrando de {pagination.from} até {pagination.to} de {pagination.total}</p>

          <C.Paginator
            className="ms-auto"
            onPageChange={goToPage}
            page={pagination.page}
            lastPage={pagination.lastPage}
          />
        </footer>
      </main>
    </div>
  );
};

DataTable.User = User;
DataTable.Date = Date;
DataTable.Actions = Actions;
export default DataTable;
