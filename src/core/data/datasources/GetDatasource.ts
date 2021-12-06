import api from '~/core/data/services/apis/epa';

import Datasource, { DatasourceParams } from '~/core/data/datasources/Datasource';

export interface QueryParams {
  with?: string[];
  orderBy?: string[];
  onlyColumns?: string[];
  hasText?: string | boolean | number;
  filters?: { field: string, value: string | number | boolean, operator?: string }[];
}

export interface GetDatasourceParams<ApiData> extends DatasourceParams, QueryParams {
  onSuccess?: ((data: ApiData) => void);
}

export default abstract class GetDatasource<ApiData>
  extends Datasource<GetDatasourceParams<ApiData>> {
  execute(params: GetDatasourceParams<ApiData>) {
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

    queryParams = this.handleStringArrayParam(queryParams, 'with', params.with);
    queryParams = this.handleParam(queryParams, 'hasText', params.hasText);
    queryParams = this.handleStringArrayParam(queryParams, 'onlyColumns', params.onlyColumns);
    queryParams = this.handleStringArrayParam(queryParams, 'order_by', params.orderBy);
    queryParams = this.handleQueryParam(queryParams, this.handleFilters(params));

    return queryParams;
  }

  /**
   * Prepara a string com a url que será usada para a requisição.
   */
  protected handleEndpoint(params: GetDatasourceParams<ApiData>) {
    return this.endpoint(params) + this.handleQueryParams(params);
  }

  protected handleStringArrayParam(queryParams: string, key: string, items?: string[]) {
    const data = items?.filter((item: string) => item.length);
    const result = data?.length ? `${key}=${data.join(',')}` : '';
    return this.handleQueryParam(queryParams, result);
  }

  protected handleParam(queryParams: string, key: string, param?: string | number | boolean) {
    if (typeof param === 'string') {
      return this.handleQueryParam(queryParams, param?.length ? `${key}=${param}` : '');
    }

    if (typeof param === 'boolean' || typeof param === 'number') {
      return this.handleQueryParam(queryParams, `${key}=${param}`);
    }

    return queryParams;
  }

  protected handleFilters(params: GetDatasourceParams<ApiData>) {
    const { filters } = params;

    if (!filters?.length) return '';

    return filters
      .filter((filter) => filter.value !== undefined)
      .map((filter) => {
        const { field, value, operator } = filter;
        return `${field}${operator ?? ''}=${value}`;
      }).join('&');
  }
}
