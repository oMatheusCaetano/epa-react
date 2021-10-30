import epaApi from '~/core/services/apis/epa';
import { IReadDatasourceParams, ReadDatasource } from '.';

export interface IShowDatasourceParams<Model, Withes> extends IReadDatasourceParams<Withes> {
  id: number;
  onSuccess?: ((data: Model) => void);
}

abstract class ShowDatasource<Model, ApiData, Withes>
  extends ReadDatasource<Model, ApiData, Withes> {
  exec(params: IShowDatasourceParams<Model, Withes>) {
    return epaApi.get<ApiData>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  protected whenFinally = (params: IShowDatasourceParams<Model, Withes>) => {
    if (params.onFinally) params.onFinally();
  }

  protected requestSucceeded(data: ApiData, params: IShowDatasourceParams<Model, Withes>) {
    if (params.onSuccess) {
      params.onSuccess(this.fromApi(data));
    }
  }

  protected handleEndpoint(params: IShowDatasourceParams<Model, Withes>) {
    let endpoint = `${this.getEndpoint()}/${params.id}`;
    endpoint += '?_';
    endpoint += this.handleWith(params);
    endpoint += this.handleFilters(params);
    return endpoint;
  }
}

export default ShowDatasource;
