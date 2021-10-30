import { ListDatasource } from '~/core/data/datasources/api';
import { IMenuItem, ApiData, fromApi } from '.';

class GetLastAccessedMenus extends ListDatasource<IMenuItem, ApiData, null> {
  getEndpoint() { return 'api/home/last-accessed-menus'; }

  fromApi(data: ApiData) { return fromApi(data); }
}

export default GetLastAccessedMenus;
