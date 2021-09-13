import { AxiosError } from 'axios';
import ApiDataSource, { IApiDataSourceClassParams } from '~/core/data/datasources/api/api-datasource';

export interface IGetApiDataSourceParams<Model> extends IApiDataSourceClassParams {
  onSuccess?: ((data: Model[]) => void);
}

abstract class GetApiDataSource<Model, ApiData, Params extends IGetApiDataSourceParams<Model>>
  extends ApiDataSource<Model, ApiData, Params> {
  exec(): Promise<void> {
    return this.http.get<ApiData[]>(this.endpoint)
      .then(({ data }) => this.whenSucceed(data))
      .catch((error: AxiosError) => this.whenFail(this.convertError(error)))
      .finally(this.whenFinally);
  }

  protected convertToSend(): object { throw new Error('Method not implemented.'); }

  protected whenSucceed = (data: ApiData[]) => {
    if (this.params.onSuccess) {
      this.params.onSuccess(this.convertAll(data));
    }
  }
}

export default GetApiDataSource;
