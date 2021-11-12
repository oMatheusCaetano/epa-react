import GetDatasource, { GetDatasourceParams } from '~/core/data/datasources/GetDatasource';

export interface PaginatedResponse<Model> {
  current_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  last_page: number;
  data: Model[];
}

export interface ListDatasourceParams<Model>
  extends GetDatasourceParams<Model[] | PaginatedResponse<Model[]>> {
  pagination?: { value: boolean, perPage?: number, page?: number };
}

export default abstract class ListDatasource<Model>
  extends GetDatasource<Model[] | PaginatedResponse<Model[]>> {
  exec(params: ListDatasourceParams<Model>): Promise<void> {
    this.params = params;
    return this.execute(params);
  }

  protected handleQueryParams(params: GetDatasourceParams<Model[] | PaginatedResponse<Model[]>>) {
    let queryParams = super.handleQueryParams(params);
    queryParams = this.handleQueryParam(queryParams, this.handlePagination(params));
    return queryParams;
  }

  protected handlePagination(params: ListDatasourceParams<Model>) {
    const { pagination } = params;

    if (!pagination?.value) return '';

    const { perPage, page } = pagination;
    return `paginated=true&per_page=${perPage ?? 10}&page=${page ?? 1}`;
  }
}
