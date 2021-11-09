import api from '~/core/data/services/apis/epa';
import Datasource, { DatasourceParams } from '~/core/data/datasources/Datasource';

export interface PaginatedResponse<Model> {
  current_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  last_page: number;
  data: Model[];
}

export interface ListDatasourceParams<Model> extends DatasourceParams {
  onSuccess?: ((data: Model[] | PaginatedResponse<Model[]>) => void);
  pagination?: { value: boolean, perPage?: number, page?: number };
  with?: string[];
  orderBy?: string[];
  hasText?: string;
  filters?: { field: string, value: string, operator?: string }[]
}

export default abstract class ListDatasource<Model> extends Datasource {
  /**
   * Faz a chamada à API.
   */
  exec(params: ListDatasourceParams<Model>) {
    return api.get<Model[] | PaginatedResponse<Model[]>>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  /**
   * Prepara a string com a url que será usada para a requisição.
   */
  protected handleEndpoint(params: ListDatasourceParams<Model>) {
    let queryParams = '';

    queryParams = this.handleQueryParam(queryParams, this.handleFilters(params));
    queryParams = this.handleQueryParam(queryParams, this.handlePagination(params));
    queryParams = this.handleQueryParam(queryParams, this.handleOrderBy(params));

    return this.endpoint() + queryParams;
  }

  protected handleQueryParam(params: string, param: string) {
    if (!param.length) return params;
    return params.startsWith('?') ? `${params}&${param}` : `?${param}`;
  }

  /**
   * O que deve acontecer quando a requisição terminar com sucesso.
   */
  protected requestSucceeded(
    data: Model[] | PaginatedResponse<Model[]>,
    params: ListDatasourceParams<Model>,
  ) {
    if (params.onSuccess) params.onSuccess(data);
  }

  /**
   * O que deve acontecer quando a requisição terminar, independente de sucesso ou erro.
   */
  protected whenFinally = (params: ListDatasourceParams<Model>) => {
    if (params.onFinally) params.onFinally();
  }

  protected handlePagination(params: ListDatasourceParams<Model>) {
    const { pagination } = params;

    if (!pagination?.value) return '';

    const { perPage, page } = pagination;
    return `paginated=true&per_page=${perPage ?? 10}&page=${page ?? 1}`;
  }

  protected handleOrderBy(params: ListDatasourceParams<Model>) {
    const filteredOrderBy = params.orderBy?.filter((orderBy) => orderBy.length);
    return filteredOrderBy?.length
      ? `order_by=${filteredOrderBy.join(',')}`
      : '';
  }

  protected handleFilters(params: ListDatasourceParams<Model>) {
    const { filters } = params;

    if (!filters?.length) return '';

    return filters.map((filter) => {
      const { field, value, operator } = filter;
      return `${field}${operator ?? ''}=${value}`;
    }).join('&');
  }
}
