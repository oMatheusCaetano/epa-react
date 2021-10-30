import { StdioNull } from 'child_process';
import { NonIdShowDatasource } from '~/core/data/datasources/api';
import { ISystemInfo, ApiData, fromApi } from '.';

class GetSystemInfo extends NonIdShowDatasource<ISystemInfo, ApiData, StdioNull> {
  getEndpoint() { return 'api/config/basic-info'; }

  fromApi(data: ApiData) { return fromApi(data); }
}

export default GetSystemInfo;
