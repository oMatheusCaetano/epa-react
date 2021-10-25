import epaApi from '~/core/services/apis/epa';

export enum ListApiDatasourceFilterOperator {
  equals = '=',
}

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

export interface IListApiDatasourceFilters {
  value?: any;
  column: string;
  operator?: ListApiDatasourceFilterOperator;
}

export interface IListApiDatasourceParams<Model, Withes> {
  onSuccess?: ((data: Model[] | IPaginatedResponse<Model[]>) => void);
  onFinally?: (() => void);
  pagination?: { value?: boolean, perPage?: number, page?: number };
  with?: { value: Withes[] };
  filters?: IListApiDatasourceFilters[];
}

abstract class ListApiDatasource<Model, ApiData, Withes> {
  abstract getEndpoint(): string;

  abstract fromApi(data: ApiData): Model;

  exec(params: IListApiDatasourceParams<Model, Withes>) {
    return epaApi.get<ApiData[] | IPaginatedApiResponse<ApiData[]>>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  protected whenFinally = (params: IListApiDatasourceParams<Model, Withes>) => {
    if (params.onFinally) params.onFinally();
  }

  protected requestSucceeded(
    data: ApiData[] | IPaginatedApiResponse<ApiData[]>,
    params: IListApiDatasourceParams<Model, Withes>,
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

  protected handleEndpoint(params: IListApiDatasourceParams<Model, Withes>) {
    let endpoint = this.getEndpoint();
    endpoint += this.handlePagination(params);
    endpoint += this.handleWith(params);
    endpoint += this.handleFilters(params);
    return endpoint;
  }

  protected handlePagination(params: IListApiDatasourceParams<Model, Withes>) {
    if (!params.pagination) return '';
    const perPage = params.pagination.perPage ?? 10;
    const page = params.pagination.page ?? 1;
    return `?paginated=true&per_page=${perPage}&page=${page}`;
  }

  protected handleWith(params: IListApiDatasourceParams<Model, Withes>) {
    if (!params.with?.value.length) return '';
    let withes = '';

    for (let i = 0; i < params.with.value.length; i++) {
      withes += i === 0 ? params.with.value[i] : `,${params.with.value[i]}`;
    }

    return `&with=${withes}`;
  }

  protected handleFilters({ filters }: IListApiDatasourceParams<Model, Withes>) {
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

  protected handleOrderByFilter(filter: IListApiDatasourceFilters) {
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

  protected convertFieldName(fieldName: string) {
    switch (fieldName.toLocaleUpperCase()) {
      case 'CREATEDAT':
      case 'CREATED_AT':
        return 'data_inclusao';

      case 'CREATEDBY':
      case 'CREATED_BY':
        return 'usuario_inclusao';

      case 'CATEGORY':
        return 'categoria';

      case 'DESCRIPTION':
        return 'descricao';

      case 'MANAGEMENTUNIT':
      case 'MANAGEMENT_UNIT':
        return 'unidade_gerencial';

      case 'MANAGEMENTUNITS':
      case 'MANAGEMENT_UNITS':
        return 'unidades_gerenciais';

      case 'NAME':
        return 'nome';

      case 'UPDATEDAT':
      case 'UPDATED_AT':
        return 'data_alteracao';

      case 'UPDATEDBY':
      case 'UPDATED_BY':
        return 'usuario_alteracao';

      case 'TITLE':
        return 'titulo';

      default:
        return fieldName;
    }
  }
}

export default ListApiDatasource;
