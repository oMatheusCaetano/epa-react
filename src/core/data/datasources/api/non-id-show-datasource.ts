import epaApi from '~/core/services/apis/epa';
import { IReadDatasourceParams, ReadDatasource } from '.';

export interface INonIdShowDatasourceParams<Model, Withes> extends IReadDatasourceParams<Withes> {
  onSuccess?: ((data: Model) => void);
}

abstract class NonIdShowDatasource<Model, ApiData, Withes>
  extends ReadDatasource<Model, ApiData, Withes> {
  exec(params: INonIdShowDatasourceParams<Model, Withes>) {
    return epaApi.get<ApiData>(this.handleEndpoint(params))
      .then(({ data }) => this.requestSucceeded(data, params))
      .finally(() => this.whenFinally(params));
  }

  protected whenFinally = (params: INonIdShowDatasourceParams<Model, Withes>) => {
    if (params.onFinally) params.onFinally();
  }

  protected requestSucceeded(data: ApiData, params: INonIdShowDatasourceParams<Model, Withes>) {
    if (params.onSuccess) {
      params.onSuccess(this.fromApi(data));
    }
  }

  protected handleEndpoint(params: INonIdShowDatasourceParams<Model, Withes>) {
    let endpoint = this.getEndpoint();
    endpoint += '?_';
    endpoint += this.handleWith(params);
    endpoint += this.handleFilters(params);
    return endpoint;
  }
}

export default NonIdShowDatasource;
