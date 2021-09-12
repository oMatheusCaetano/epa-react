/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';
import ApiDataSource, { IApiDataSourceClassParams } from './api-datasource';

export interface ICreateApiDataSourceParams<Model, ModelData> extends IApiDataSourceClassParams {
  data: ModelData;
  onSuccess?: ((data: Model) => void);
}

export default abstract class CreateApiDataSource<Model, ModelData, ApiData>
  extends ApiDataSource<Model, ApiData, ICreateApiDataSourceParams<Model, ModelData>> {
  exec() {
    return this.http.post<ApiData>(this.endpoint, this.convertToSend())
      .then(({ data }) => this.whenSucceed(data))
      .catch((error: AxiosError) => this.whenFail(this.convertError(error)))
      .finally(this.whenFinally);
  }

  protected whenSucceed = (data: ApiData) => {
    if (this.params.onSuccess) {
      this.params.onSuccess(this.convert(data));
    }
  }

  protected abstract convertToSend(): object;
}
