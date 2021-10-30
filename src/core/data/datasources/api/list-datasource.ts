import epaApi from '~/core/services/apis/epa';
import ReadDatasource, { IReadDatasourceParams } from './read-datasource';

export interface IPaginatedResponse<Model> {
  currentPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
  lastPage: number;
  data: Model;
}

export interface IPaginatedApiResponse<Model> {
  current_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  last_page: number;
  data: Model;
}

export interface IListDatasourceParams<Model, Withes> extends IReadDatasourceParams<Withes> {
  onSuccess?: ((data: Model[] | IPaginatedResponse<Model[]>) => void);
  pagination?: { value?: boolean, perPage?: number, page?: number };
}

abstract class ListDatasource<Model, ApiData, Withes>
  extends ReadDatasource<Model, ApiData, Withes> {
  exec(params: IListDatasourceParams<Model, Withes>) {
    return epaApi.get<ApiData[] | IPaginatedApiResponse<ApiData[]>>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  protected whenFinally = (params: IListDatasourceParams<Model, Withes>) => {
    if (params.onFinally) params.onFinally();
  }

  protected requestSucceeded(
    data: ApiData[] | IPaginatedApiResponse<ApiData[]>,
    params: IListDatasourceParams<Model, Withes>,
  ) {
    if (params.onSuccess && params.pagination) {
      data = data as IPaginatedApiResponse<ApiData[]>;
      params.onSuccess({
        ...data,
        currentPage: data.current_page,
        perPage: Number(data.per_page),
        lastPage: Number(data.last_page),
        data: data.data.map((item) => this.fromApi(item)),
      });
      return;
    }

    if (params.onSuccess) {
      data = data as ApiData[];
      params.onSuccess(data.map((item) => this.fromApi(item)));
    }
  }

  protected handleEndpoint(params: IListDatasourceParams<Model, Withes>) {
    let endpoint = this.getEndpoint();
    endpoint += this.handlePagination(params).length ? this.handlePagination(params) : '?_';
    endpoint += this.handleWith(params);
    endpoint += this.handleFilters(params);
    return endpoint;
  }

  protected handlePagination(params: IListDatasourceParams<Model, Withes>) {
    if (!params.pagination) return '';
    const perPage = params.pagination.perPage ?? 10;
    const page = params.pagination.page ?? 1;
    return `?paginated=true&per_page=${perPage}&page=${page}`;
  }
}

export default ListDatasource;
