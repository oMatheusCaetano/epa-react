/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';
import IApiError, { ApiErrorStatus } from '~/core/errors/IApiError';

import IPersonalGoal from '~/features/PersonalGoals/domain/models/IPersonalGoal';
import api from '~/services/apis/epa';

interface ApiData {
  codigo: number,
  descricao: string,
  concluido: number,
  usuario: number,
  data_inclusao: string,
  data_conclusao: string,
}

export interface IPersonalGoalData {
  description: string;
  user_id: number;
  done?: boolean;
}

export interface ICreatePersonalGoalParams {
  personalGoal: IPersonalGoalData;
  onSuccess?: (data: IPersonalGoal) => void;
  onError?: ((error: IApiError) => void);
  onfinally?: (() => void);
}

class CreatePersonalGoal {
  private endpoint: string;

  private params: ICreatePersonalGoalParams;

  constructor(params: ICreatePersonalGoalParams) {
    this.endpoint = 'api/metas-pessoais';
    this.params = params;
  }

  exec() {
    api.post<ApiData>(this.endpoint, this.convertToSend(this.params.personalGoal))
      .then(({ data }) => this.params.onSuccess && this.params.onSuccess(this.convert(data)))
      .catch((error) => this.params.onError && this.params.onError(this.convertError(error)))
      .finally(this.params.onfinally);
  }

  convertToSend(goal: IPersonalGoalData) {
    return {
      ...goal,
      descricao: goal.description,
      usuario: goal.user_id,
      concluido: goal.done ? 1 : 0,
    };
  }

  convert(data: ApiData): IPersonalGoal {
    return {
      ...data,
      id: data.codigo,
      description: data.descricao,
      done: !!data.concluido,
      user_id: data.usuario,
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

export default CreatePersonalGoal;
