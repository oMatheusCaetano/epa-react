/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';
import IApiError, { ApiErrorStatus } from '~/core/errors/IApiError';

import IFibEmotion from '~/features/GrossInternalHappiness/domain/models/IFibEmotion';
import api from '~/services/apis/epa';

interface ApiData {
  id: number,
  descricao: string,
  ativo: boolean,
  data_inclusao: string,
  data_alteracao: string,
  _permissions: {
    edit: boolean,
    delete: boolean,
    fields: {
      descricao: {
        edit: boolean
      },
      ativo: {
        edit: boolean
      }
    }
  }
}

export interface IGetFibEmotionsParams {
  onSuccess(data: IFibEmotion[]): void;
  onError(error: IApiError): void;
  filters?: IGetFibEmotionsFilters;
}

export interface IGetFibEmotionsFilters {
  active?: boolean;
}

class GetFibEmotions {
  private endpoint: string;

  private queryParams: string;

  private params: IGetFibEmotionsParams;

  constructor(params: IGetFibEmotionsParams) {
    this.endpoint = 'api/FibEmocoes';
    this.params = params;
    this.queryParams = '';
    this.queryParams = this.handleFilters(params.filters);
  }

  exec() {
    api.get<ApiData[]>(`${this.endpoint}${this.queryParams}`)
      .then(({ data }) => this.params.onSuccess(this.convertAll(data)))
      .catch((error: AxiosError) => this.params.onError(this.convertError(error)));
  }

  convertAll(data: ApiData[]): IFibEmotion[] {
    return data.map((emotion) => this.convert(emotion));
  }

  convert(data: ApiData): IFibEmotion {
    return {
      ...data,
      description: data.descricao,
      active: data.ativo,
      created_at: data.data_inclusao,
      updated_at: data.data_alteracao,
    };
  }

  convertError(data: AxiosError): IApiError {
    return {
      status: this.handleErrorStatus(data.response?.status),
      message: data.message,
      data: data.response?.data,
    };
  }

  handleFilters(filters?: IGetFibEmotionsFilters): string {
    if (!filters) {
      return '';
    }

    if (filters.active !== undefined) {
      const value = filters.active ? 1 : 0;
      this.queryParams += this.queryParams.length ? `&ativo=${value}` : `?ativo=${value}`;
    }

    return this.queryParams;
  }

  handleErrorStatus(code: number | undefined): ApiErrorStatus {
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

export default GetFibEmotions;
