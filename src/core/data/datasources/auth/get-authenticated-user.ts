/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';

import IApiError, { ApiErrorStatus } from '~/core/errors/IApiError';
import api from '~/services/apis/epa';
import IUser from '~/core/domain/models/IUser';

interface ApiData {
  login: string,
  cliente: {
    codigo: number;
    nome: string;
    email?: string;
    foto?: string;
  }
}

export interface IGetAuthenticatedUserParams {
  onSuccess(data: IUser): void;
  onError(error: IApiError): void;
}

class GetAuthenticatedUser {
  private endpoint: string;

  private params: IGetAuthenticatedUserParams;

  constructor(params: IGetAuthenticatedUserParams) {
    this.endpoint = 'api/auth/usuario?with=cliente';
    this.params = params;
  }

  exec() {
    api.get<ApiData>(this.endpoint)
      .then(({ data }) => this.params.onSuccess(this.convert(data)))
      .catch((error: AxiosError) => this.params.onError(this.convertError(error)));
  }

  convert(data: ApiData): IUser {
    return {
      ...data,
      id: data.cliente.codigo,
      name: data.cliente.nome,
      email: data.cliente.email,
      image: data.cliente.foto,
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

export default GetAuthenticatedUser;
