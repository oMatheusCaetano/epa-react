/* eslint-disable class-methods-use-this */
import { AxiosError } from 'axios';
import ApiDataSource, { IApiDataSourceClassParams } from '~/core/data/datasources/api/api-datasource';

export interface IUpdateApiDataSourceParams<Model> extends IApiDataSourceClassParams {
  id: number;
  data: Model;
  onSuccess?: (data: Model) => void;
}

export default abstract class UpdateApiDataSource<Model, ApiData>
  extends ApiDataSource<Model, ApiData, IUpdateApiDataSourceParams<Model>> {
  exec(): Promise<void> {
    return this.http.put<ApiData>(this.endpoint, this.convertToSend())
      .then(({ data }) => this.whenSucceed(data))
      .catch((error: AxiosError) => this.whenFail(this.convertError(error)))
      .finally(this.whenFinally);
  }

  protected handleEndpoint() {
    this.endpoint = `${this.endpoint}/${this.params.id}?${this.queryParams}`;
  }

  protected whenSucceed = (data: ApiData) => {
    if (this.params.onSuccess) {
      this.params.onSuccess(this.convert(data));
    }
  }

  protected abstract convertToSend(): object;
}
