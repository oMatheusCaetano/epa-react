import { ListDatasource } from '~/core/data/datasources/api';
import { IMenuItem } from '.';

export interface GetMenusListApiData {
  path?: string;
  menu: string;
  link?: string;
  children: GetMenusListApiData[];
}

class GetMenusList
  extends ListDatasource<IMenuItem, GetMenusListApiData, null> {
  getEndpoint() { return 'api/home/menus-list'; }

  fromApi(data: GetMenusListApiData): IMenuItem {
    return {
      ...data,
      label: data.menu,
      children: data.children.map((child) => this.fromApi(child)),
    };
  }
}

export default GetMenusList;
