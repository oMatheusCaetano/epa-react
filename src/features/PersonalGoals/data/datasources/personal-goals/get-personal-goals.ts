/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';
import IApiError, { ApiErrorStatus } from '~/core/errors/IApiError';

import IPersonalGoal from '~/features/PersonalGoals/domain/models/IPersonalGoal';
import api from '~/services/apis/epa';

interface ApiData {
  codigo: number,
  descricao: string,
  concluido: number,
  usuario: number | { codigo_cliente: number },
  data_inclusao: string,
  data_conclusao: string,
}

export interface IGetPersonalGoalsParams {
  onSuccess(data: IPersonalGoal[]): void;
  onError(error: IApiError): void;
  filters?: IGetPersonalGoalFilters;
}

export interface IGetPersonalGoalFilters {
  done?: boolean;
  user_id?: number;
}

class GetPersonalGoals {
  private endpoint: string;

  private queryParams: string;

  private params: IGetPersonalGoalsParams;

  constructor(params: IGetPersonalGoalsParams) {
    this.endpoint = 'api/metas-pessoais';
    this.params = params;
    this.queryParams = '';
    this.queryParams = this.handleFilters(params.filters);
  }

  exec() {
    api.get<ApiData[]>(`${this.endpoint}${this.queryParams}`)
      .then(({ data }) => this.params.onSuccess(this.convertAll(data)))
      .catch((error: AxiosError) => this.params.onError(this.convertError(error)));
  }

  convertAll(data: ApiData[]): IPersonalGoal[] {
    return data.map((emotion) => this.convert(emotion));
  }

  convert(data: ApiData): IPersonalGoal {
    return {
      ...data,
      id: data.codigo,
      description: data.descricao,
      done: !!data.concluido,
      user_id: typeof data.usuario === 'number' ? data.usuario : data.usuario.codigo_cliente,
      created_at: data.data_inclusao,
      finished_at: data.data_conclusao,
    };
  }

  convertError(data: AxiosError): IApiError {
    return {
      status: this.handleErrorStatus(data.response?.status),
      message: data.message,
      data: data.response?.data,
    };
  }

  handleFilters(filters?: IGetPersonalGoalFilters): string {
    if (!filters) {
      return '';
    }

    if (filters.done !== undefined) {
      const value = filters.done ? 1 : '0,null';
      this.queryParams += this.queryParams.length ? `&concluido=${value}` : `?concluido=${value}`;
    }

    if (filters.user_id !== undefined) {
      this.queryParams += this.queryParams.length ? `&usuario=${filters.user_id}` : `?usuario=${filters.user_id}`;
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

export default GetPersonalGoals;
