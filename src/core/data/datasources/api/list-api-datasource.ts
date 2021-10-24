import { AxiosError } from 'axios';

import epaApi from '~/core/services/apis/epa';
import { IApiError, ApiErrorStatus } from '~/core/errors';

export interface IListApiDataSourceParams {
  onError?: ((error: IApiError) => void);
  onFinally?: (() => void);
}

abstract class ListApiDataSource {
  protected endpoint = '';

  protected queryParams = '';

  protected http = null;

  /** Executes the API call */
  exec(params: IListApiDataSourceParams): Promise<void> {
    return epaApi.get(this.endpoint)
      .then(({ data }) => this.whenSucceed(data, params))
      .catch((error: AxiosError) => this.whenFail(this.convertError(error), params))
      .finally(() => this.whenFinally(params));
  }

  setEndpoint(endpoint: string): ListApiDataSource {
    this.endpoint = endpoint;
    return this;
  }

  protected whenSucceed(data: any, params: IListApiDataSourceParams) {
    console.log(data);
  }

  protected whenFinally(params: IListApiDataSourceParams) {
    if (params.onFinally) params.onFinally();
  }

  protected whenFail(error: IApiError, params: IListApiDataSourceParams) {
    if (params.onError) params.onError(error);
  }

  protected convertError(data: AxiosError): IApiError {
    return {
      status: this.handleErrorStatus(data.response?.status),
      message: data.message,
      data: data.response?.data,
    };
  }

  protected handleErrorStatus(code: number | undefined): ApiErrorStatus {
    switch (code) {
      case ApiErrorStatus.ERROR:
        return ApiErrorStatus.ERROR;

      case ApiErrorStatus.UNAUTHORIZED:
        return ApiErrorStatus.UNAUTHORIZED;

      case ApiErrorStatus.UNPROCESSABLE_ENTITY:
        return ApiErrorStatus.UNPROCESSABLE_ENTITY;

      default:
        return ApiErrorStatus.UNKNOWN;
    }
  }
}

export default ListApiDataSource;
