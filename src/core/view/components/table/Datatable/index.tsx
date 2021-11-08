/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import DateMoment, { IProps as DateMomentProps } from './subComponents/DateMoment';
import User, { IProps as UserProps } from './subComponents/User';
import Actions from './subComponents/Actions';

import { ListDatasource, IListDatasourceParams, IPaginatedResponse } from '~/core/data/datasources/api';
import { SectionContainer } from '~/core/view/components';
import HideColumnsButton from './components/HideColumnsButton';
import ExportPDFButton from './components/ExportPDFButton';
import ExportCSVButton from './components/ExportCSVButton';
import Table, { IDatatableColumn } from './components/Table';

import * as Styled from './styles';

interface DatatableSubComponents {
  Date: React.FC<DateMomentProps>;
  User: React.FC<UserProps>;
  Actions: React.FC;
}

export interface IProps {
  title?: string;
  datasource: ListDatasource<any, any, any>;
  columns: IDatatableColumn[];
  datasourceParams?: IListDatasourceParams<any, any>;
}

const Datatable: React.FC<IProps> & DatatableSubComponents = ({
  title,
  columns,
  datasource,
  datasourceParams,
}) => {
  const [pagination, setPagination] = useState({} as IPaginatedResponse<any>);
  const [cColumns, setCColumn] = useState([] as IDatatableColumn[]);
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
      onFinally: () => {
        setLoading(false);
      },
    });
  };

  const COLUMNS = {
    toggleColumnsVisibility: (column: IDatatableColumn) => {
      const columnsVisibility = columns.map((item) => {
        if (item.name === column.name) item.hide = !item.hide;
        return item;
      });

      setCColumn(columnsVisibility);
    },

    init: () => {
      setCColumn(columns);
    },
  };

  useEffect(() => {
    send();
    COLUMNS.init();
  }, [datasourceParams?.filters]);

  return (
    <SectionContainer title={title}>
      <Styled.TableHeader>
        <aside>
          <span>Mostrar </span>
          <select disabled={loading}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span> Resultados</span>
        </aside>

        <Styled.TableHeaderRight>
          <Styled.TableHeaderSearch
            type="search"
            placeholder="Procurar por..."
          />

          <div>
            <HideColumnsButton
              columns={cColumns}
              onSelect={COLUMNS.toggleColumnsVisibility}
            />

            <ExportPDFButton
              columns={cColumns}
              datasource={datasource}
              datasourceParams={datasourceParams}
            />

            <ExportCSVButton
              columns={cColumns}
              datasource={datasource}
              datasourceParams={datasourceParams}
            />
          </div>
        </Styled.TableHeaderRight>
      </Styled.TableHeader>

      <Table columns={cColumns} data={data} />
    </SectionContainer>
  );
};

Datatable.Date = DateMoment;
Datatable.User = User;
Datatable.Actions = Actions;
export default Datatable;
