import { AxiosError } from 'axios';

import api from '~/core/data/services/apis/epa';

import Datasource, { ApiStatus, DatasourceParams } from '~/core/data/datasources/Datasource';

export interface CreateDatasourceParams<ApiData> extends DatasourceParams {
  data: any;
  onSuccess?: ((data: ApiData) => void);
}

export default abstract class CreateDatasource<ApiData>
  extends Datasource<CreateDatasourceParams<ApiData>> {
  execute(params: CreateDatasourceParams<ApiData>) {
    return api.post<ApiData>(this.endpoint(params), params.data)
      .then(({ data }) => this.requestSucceeded(data, params))
      .catch((error: AxiosError) => this.requestFailed(error, params))
      .finally(() => this.whenFinally(params));
  }

  /**
   * O que deve acontecer quando a requisição terminar com sucesso.
   */
  protected requestSucceeded(data: ApiData, params: CreateDatasourceParams<ApiData>) {
    if (params.onSuccess) params.onSuccess(data);
  }

  /**
   * O que deve acontecer quando a requisição terminar com erro.
   */
  protected requestFailed({ response }: AxiosError, params: CreateDatasourceParams<ApiData>) {
    if (!params.onError) return;

    if (!response) {
      params.onError({
        status: ApiStatus.BAD_REQUEST,
        message: 'Erro ao iniciar comunicação com o servidor.',
      });
      return;
    }

    switch (response.status) {
      case ApiStatus.UNPROCESSABLE_ENTITY:
        params.onError({
          status: response.status,
          message: response.data.message,
          originalResponse: response,
          errors: response.data.data.meta.errors,
        });
        break;

      default:
        params.onError({
          status: response.status,
          message: response.data.message || response.data.error || 'Erro interno do servidor.',
          originalResponse: response,
        });
    }
  }

  /**
   * O que deve acontecer quando a requisição terminar, independente de sucesso ou erro.
   */
  protected whenFinally = (params: CreateDatasourceParams<ApiData>) => {
    if (params.onFinally) params.onFinally();
  }
}
