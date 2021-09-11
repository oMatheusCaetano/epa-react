/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';
import IApiError, { ApiErrorStatus } from '~/core/errors/IApiError';

import api from '~/services/apis/epa';

export interface IDeletePersonalGoalParams {
  personalGoalId: number;
  onSuccess?: (() => void);
  onError?: ((error: IApiError) => void);
  onfinally?: (() => void);
}

class DeletePersonalGoal {
  private endpoint: string;

  private params: IDeletePersonalGoalParams;

  constructor(params: IDeletePersonalGoalParams) {
    this.endpoint = 'api/metas-pessoais';
    this.params = params;
  }

  exec() {
    api.delete(`${this.endpoint}/${this.params.personalGoalId}`)
      .then(this.params.onSuccess)
      .catch((error) => this.params.onError && this.params.onError(this.convertError(error)))
      .finally(this.params.onfinally);
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

export default DeletePersonalGoal;
