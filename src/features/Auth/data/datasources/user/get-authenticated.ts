import { NonIdShowDatasource } from '~/core/data/datasources/api';
import { IUser, ApiData, Withes, fromApi } from '.';

class GetAuthenticated extends NonIdShowDatasource<IUser, ApiData, Withes> {
  getEndpoint() { return 'api/auth/usuario'; }

  fromApi(data: ApiData) { return fromApi(data); }
}

export default GetAuthenticated;
