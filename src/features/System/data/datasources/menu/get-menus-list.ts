import ListDatasource from '~/core/data/datasources/ListDatasource';
import { MenuItem } from '~/features/System/domain/models';

export default class GetMenusList extends ListDatasource<MenuItem> {
  protected endpoint(): string { return 'api/home/menus-list'; }
}
