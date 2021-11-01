import { ListDatasource } from '~/core/data/datasources/api';
import { IMenuItem } from '.';

export interface GetLastAccessedMenusApiData {
  link: string,
  nome_menu: string,
}

class GetLastAccessedMenus extends ListDatasource<IMenuItem, GetLastAccessedMenusApiData, null> {
  getEndpoint() { return 'api/home/last-accessed-menus'; }

  fromApi(data: GetLastAccessedMenusApiData) {
    return {
      ...data,
      label: data.nome_menu,
    };
  }
}

export default GetLastAccessedMenus;
