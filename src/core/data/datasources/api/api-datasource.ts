/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios';
import api from '~/core/services/apis/epa';
import { IApiError, ApiErrorStatus } from '~/core/errors';

export interface IApiDataSourceClassParams {
  onError?: ((error: IApiError) => void);
  onFinally?: (() => void);
}

abstract class ApiDataSource<Resource, ApiData, Params extends IApiDataSourceClassParams> {
  protected params: Params;

  protected endpoint = '';

  protected queryParams = '';

  protected http;

  constructor(params: Params) {
    this.params = params;
    this.http = api;
    this.setEndpoint();
    this.handleQueryParams();
    this.handleEndpoint();
  }

  abstract exec(): Promise<void>;

  protected setEndpoint() {
    this.endpoint = '';
  }

  protected abstract convertToSend(): object;

  protected abstract convert(data: ApiData): Resource;

  protected abstract whenSucceed(data: any): void;

  protected whenFail = (error: IApiError) => {
    if (this.params.onError) this.params.onError(error);
  }

  protected whenFinally = () => { if (this.params.onFinally) this.params.onFinally(); }

  protected convertAll(data: ApiData[]): Resource[] {
    return data.map((emotion) => this.convert(emotion));
  }

  protected convertError(data: AxiosError): IApiError {
    return {
      status: this.handleErrorStatus(data.response?.status),
      message: data.message,
      data: data.response?.data,
    };
  }

  protected handleEndpoint() {
    this.endpoint = `${this.endpoint}?${this.queryParams}`;
  }

  protected handleQueryParams() {
    this.queryParams = '';
  }

  protected addQueryParam(filter: any, key: string, value: string|boolean|number|undefined) {
    if (filter !== undefined && value !== undefined) {
      this.queryParams += this.queryParams.length ? `&${key}=${value}` : `${key}=${value}`;
    }
  }

  protected handleErrorStatus(code: number | undefined): ApiErrorStatus {
    switch (code) {
      case ApiErrorStatus.UNKNOWN:
        return ApiErrorStatus.UNKNOWN;

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

export default ApiDataSource;
