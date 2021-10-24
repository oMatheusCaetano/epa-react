import epaApi from '~/core/services/apis/epa';
import IPost from '~/features/CorporateWall/domain/models/IPost';
import { ApiData, fromJson } from '.';

export enum GetPostsWithes {
  CREATED_BY = 'usuarioInclusao',
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

export interface IGetPostsParams {
  onSuccess?: ((data: IPost[] | IPaginatedResponse<IPost[]>) => void);
  onFinally?: (() => void);
  pagination?: { value?: boolean, perPage?: number, page?: number };
  with?: { value: GetPostsWithes|string[] }
}

class GetPosts {
  exec(params: IGetPostsParams) {
    return epaApi.get<ApiData[] | IPaginatedApiResponse<ApiData[]>>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  getEndpoint() {
    return 'api/comunicacao-mural';
  }

  protected whenFinally = (params: IGetPostsParams) => {
    if (params.onFinally) params.onFinally();
  }

  protected requestSucceeded(
    data: ApiData[] | IPaginatedApiResponse<ApiData[]>,
    params: IGetPostsParams,
  ) {
    if (params.onSuccess && params.pagination) {
      data = data as IPaginatedApiResponse<ApiData[]>;
      params.onSuccess({
        ...data,
        currentPage: data.current_page,
        perPage: Number(data.per_page),
        lastPage: Number(data.last_page),
        data: data.data.map((item) => fromJson(item)),
      });
      return;
    }

    if (params.onSuccess) {
      data = data as ApiData[];
      params.onSuccess(data.map((item) => fromJson(item)));
    }
  }

  protected handleEndpoint(params: IGetPostsParams) {
    let endpoint = this.getEndpoint();
    endpoint += `?${this.handlePagination(params)}`;
    endpoint += this.handleWith(params).length ? `&${this.handleWith(params)}` : '';
    return endpoint;
  }

  protected handlePagination(params: IGetPostsParams) {
    if (!params.pagination) return '';
    const perPage = params.pagination.perPage ?? 10;
    const page = params.pagination.page ?? 1;
    return `paginated=true&per_page=${perPage}&page=${page}`;
  }

  protected handleWith(params: IGetPostsParams) {
    if (!params.with?.value.length) return '';
    let withes = '';

    for (let i = 0; i < params.with.value.length; i++) {
      withes += i === 0 ? params.with.value[i] : `,${params.with.value[i]}`;
    }

    return `with=${withes}`;
  }
}

export default GetPosts;
