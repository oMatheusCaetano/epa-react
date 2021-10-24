/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import ReactDataTable from 'react-data-table-component';
import GetPosts, { IPaginatedResponse, IGetPostsParams } from '~/features/CorporateWall/data/datasources/post/get-posts';
import DateMoment, { IProps as DateMomentProps } from './subComponents/DateMoment';
import User, { IProps as UserProps } from './subComponents/User';

import * as Styled from './styles';

interface DatatableSubComponents {
  Date: React.FC<DateMomentProps>;
  User: React.FC<UserProps>;
}

export interface IPropsColumn {
  name: string;
  width?: string;
  selector: (row: any) => any;
}

export interface IProps {
  datasource: GetPosts;
  columns: IPropsColumn[];
  datasourceParams?: IGetPostsParams;
}

/**
 * @link https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page
 */
const Datatable: React.FC<IProps> & DatatableSubComponents = ({
  datasource,
  columns,
  datasourceParams,
}) => {
  const perPageRef = useRef<HTMLSelectElement>(null);

  const [pagination, setPagination] = useState({} as IPaginatedResponse<any>);
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const send = (itemsPerPage?: number, page = 1) => {
    setLoading(true);
    const dsParams = datasourceParams ?? {};
    datasource.exec({
      ...dsParams,
      pagination: { perPage: itemsPerPage ?? pagination.perPage, page },
      onSuccess: (data) => {
        data = data as IPaginatedResponse<any>;
        setData(data.data);
        setPagination({ ...data, data: [] });
      },
      onFinally: () => { setLoading(false); },
    });
  };

  const changePage = (targetPage : number) => {
    send(undefined, targetPage);
  };

  useEffect(() => {
    send();
    perPageRef.current?.addEventListener('change', () => send(Number(perPageRef.current?.value), 1));
  }, []);

  return (
    <div>
      <Styled.Header>
        <section>
          <Styled.PerPageSelector className="form-control" ref={perPageRef} disabled={loading}>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </Styled.PerPageSelector>
          <label>Resultados por página</label>
        </section>

        <Styled.HeaderRight>
          <section>
            <label>Pesquisar</label>
            <input type="search" />
          </section>

          <section>
            <button>Ocultar Colunas</button>
            <button>PDF</button>
            <button>Excel</button>
          </section>
        </Styled.HeaderRight>
      </Styled.Header>

      <ReactDataTable
        columns={columns}
        data={data}
        striped
        highlightOnHover
        pointerOnHover
        dense
      />

      <Styled.Footer>
        <span>
          Mostrando de {pagination.from} até {pagination.to} de {pagination.total} registros
        </span>

        <section>
          <Styled.PaginationButton
            disabled={loading || pagination.currentPage <= 1}
            onClick={() => changePage(pagination.currentPage - 1)}
          >
            Anterior
          </Styled.PaginationButton>

          {
            pagination.currentPage > 1
            && (
              <Styled.PaginationButton disabled={loading} onClick={() => changePage(1)}>
                1
              </Styled.PaginationButton>
            )
          }

          {pagination.currentPage > 5 && <Styled.PaginationEllipsis>...</Styled.PaginationEllipsis>}

          {
            (pagination.currentPage - 3 > 1)
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.currentPage - 3)}
              >
                {pagination.currentPage - 3}
              </Styled.PaginationButton>
            )
          }
          {
            (pagination.currentPage - 2 > 1)
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.currentPage - 2)}
              >
                {pagination.currentPage - 2}
              </Styled.PaginationButton>
            )
          }
          {
            (pagination.currentPage - 1 > 1)
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.currentPage - 1)}
              >
                {pagination.currentPage - 1}
              </Styled.PaginationButton>
            )
          }

          <Styled.PaginationActiveButton disabled>
            {pagination.currentPage}
          </Styled.PaginationActiveButton>

          {
            pagination.currentPage + 1 < pagination.lastPage
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.currentPage + 1)}
              >
                {pagination.currentPage + 1}
              </Styled.PaginationButton>
            )
          }

          {
            pagination.currentPage + 2 < pagination.lastPage
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.currentPage + 2)}
              >
                {pagination.currentPage + 2}
              </Styled.PaginationButton>
            )
          }

          {
            pagination.currentPage + 3 < pagination.lastPage
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.currentPage + 3)}
              >
                {pagination.currentPage + 3}
              </Styled.PaginationButton>
            )
          }

          {
          pagination.currentPage < (pagination.lastPage - 4)
          && (
            <Styled.PaginationEllipsis>
              ...
            </Styled.PaginationEllipsis>
          )
}

          {
            pagination.currentPage < pagination.lastPage
            && (
              <Styled.PaginationButton
                disabled={loading}
                onClick={() => changePage(pagination.lastPage)}
              >
                {pagination.lastPage}
              </Styled.PaginationButton>
            )
          }

          <Styled.PaginationButton
            disabled={loading || pagination.currentPage >= pagination.lastPage}
            onClick={() => changePage(pagination.currentPage + 1)}
          >
            Próxima
          </Styled.PaginationButton>
        </section>
      </Styled.Footer>
    </div>
  );
};

Datatable.Date = DateMoment;
Datatable.User = User;
export default Datatable;
