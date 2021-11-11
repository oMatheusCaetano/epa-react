import api from '~/core/data/services/apis/epa';

import Datasource, { DatasourceParams } from '~/core/data/datasources/Datasource';

export interface QueryParams {
  with?: string[];
  orderBy?: string[];
  hasText?: string;
  filters?: { field: string, value: string, operator?: string }[];
}

export interface GetDatasourceParams<ApiData> extends DatasourceParams, QueryParams {
  onSuccess?: ((data: ApiData) => void);
}

export default abstract class GetDatasource<ApiData>
  extends Datasource<GetDatasourceParams<ApiData>> {
  /**
   * Faz a chamada à API.
   */
  exec(params: GetDatasourceParams<ApiData>) {
    return api.get<ApiData>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  /**
   * O que deve acontecer quando a requisição terminar com sucesso.
   */
  protected requestSucceeded(data: ApiData, params: GetDatasourceParams<ApiData>) {
    if (params.onSuccess) params.onSuccess(data);
  }

  /**
   * O que deve acontecer quando a requisição terminar, independente de sucesso ou erro.
   */
  protected whenFinally = (params: GetDatasourceParams<ApiData>) => {
    if (params.onFinally) params.onFinally();
  }

  /**
   * Prepara a string com os query parameters que serão utilizados na requisição.
   */
  protected handleQueryParams(params: GetDatasourceParams<ApiData>) {
    let queryParams = '';

    queryParams = this.handleQueryParam(queryParams, this.handleWith(params));
    queryParams = this.handleQueryParam(queryParams, this.handleFilters(params));
    queryParams = this.handleQueryParam(queryParams, this.handleOrderBy(params));

    return queryParams;
  }

  /**
   * Prepara a string com a url que será usada para a requisição.
   */
  protected handleEndpoint(params: GetDatasourceParams<ApiData>) {
    return this.endpoint(params) + this.handleQueryParams(params);
  }

  protected handleWith(params: GetDatasourceParams<ApiData>) {
    return params.with?.length
      ? `with=${params.with.join(',')}`
      : '';
  }

  protected handleOrderBy(params: GetDatasourceParams<ApiData>) {
    const filteredOrderBy = params.orderBy?.filter((orderBy) => orderBy.length);
    return filteredOrderBy?.length
      ? `order_by=${filteredOrderBy.join(',')}`
      : '';
  }

  protected handleFilters(params: GetDatasourceParams<ApiData>) {
    const { filters } = params;

    if (!filters?.length) return '';

    return filters.map((filter) => {
      const { field, value, operator } = filter;
      return `${field}${operator ?? ''}=${value}`;
    }).join('&');
  }
}
