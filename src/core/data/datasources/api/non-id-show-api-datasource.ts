import { AxiosError } from 'axios';
import ApiDataSource, { IApiDataSourceClassParams } from '~/core/data/datasources/api/api-datasource';

export type INonIdShowApiDataSourceParams<Model> = IApiDataSourceClassParams & {
  onSuccess?: ((data: Model) => void);
}

abstract class NonIdShowApiDataSource<Model, ApiData>
  extends ApiDataSource<Model, ApiData, INonIdShowApiDataSourceParams<Model>> {
  exec(): Promise<void> {
    return this.http.get(this.endpoint)
      .then(({ data }) => this.whenSucceed(data))
      .catch((error: AxiosError) => this.whenFail(this.convertError(error)))
      .finally(this.whenFinally);
  }

  protected whenSucceed = (data: ApiData) => {
    if (this.params.onSuccess) {
      this.params.onSuccess(this.convert(data));
    }
  }
}

export default NonIdShowApiDataSource;
