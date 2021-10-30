/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiDatasource, { IDatasourceParams } from './base-datasource';

export enum ReadDatasourceFilterOperator {
  equals = '=',
}

export interface IReadDatasourceFilters {
  value?: any;
  column: string;
  operator?: ReadDatasourceFilterOperator;
}

export interface IReadDatasourceParams<Withes> extends IDatasourceParams {
  with?: { value: Withes[] };
  filters?: IReadDatasourceFilters[];
}

abstract class ReadDatasource<Model, ApiData, Withes> extends ApiDatasource<Model, ApiData> {
  protected handleWith(params: IReadDatasourceParams<Withes>) {
    if (!params.with?.value.length) return '';
    let withes = '';

    for (let i = 0; i < params.with.value.length; i++) {
      withes += i === 0 ? params.with.value[i] : `,${params.with.value[i]}`;
    }

    return `&with=${withes}`;
  }

  protected handleFilters({ filters }: IReadDatasourceParams<Withes>) {
    if (!filters) return '';
    let stringFilters = '';

    filters.forEach((filter) => {
      if (!filter.value) return;

      if (filter.column.toLocaleUpperCase() === 'ORDERBY' || filter.column.toLocaleUpperCase() === 'ORDER_BY') {
        stringFilters += `&${this.handleOrderByFilter(filter)}`;
        return;
      }

      stringFilters += `&${this.convertFieldName(filter.column)}${filter.operator ?? '='}${filter.value ?? ''}`;
    });

    return stringFilters;
  }

  protected handleOrderByFilter(filter: IReadDatasourceFilters) {
    const items = filter.value.split(',');
    let orderBy = 'order_by=';

    items.forEach((item: string, index: number) => {
      const data = item.split(':');
      if (!data.length) return;
      orderBy += this.convertFieldName(data[0]);
      if (data.length > 1) orderBy += `:${data[1]}`;
      if (index !== items.length - 1) orderBy += ',';
    });

    return orderBy;
  }
}

export default ReadDatasource;
