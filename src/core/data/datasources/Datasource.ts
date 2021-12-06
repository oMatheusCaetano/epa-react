import { AxiosResponse } from 'axios';

export enum ApiStatus {
  UNPROCESSABLE_ENTITY = 422,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface DataError {
  [key: string]: string[];
}

export interface ApiError {
  status: number;
  message?: string;
  errors?: DataError;
  originalResponse?: AxiosResponse<any>;
}

export interface DatasourceParams {
  onFinally?: (() => void);
  onError?: ((error: ApiError) => void);
}

export default abstract class Datasource<Params> {
  protected params = {} as Params;

  protected abstract endpoint(params: Params): string;

  /**
   * Faz a chamada à API.
   */
  abstract execute(params: Params): Promise<void>;

  exec(params: Params): Promise<void> {
    this.params = params;
    return this.execute(params);
  }

  refresh(params?: Params): Promise<void> {
    return this.execute(params ?? this.params);
  }

  protected handleQueryParam(params: string, param: string) {
    if (!param.length) return params;
    return params.startsWith('?') ? `${params}&${param}` : `?${param}`;
  }
}
