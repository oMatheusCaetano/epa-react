import ListDatasource from '~/core/data/datasources/ListDatasource';
import { RecentlyAccessedMenuItem } from '~/features/System/domain/models';

export default class GetRecentlyAccessedMenus extends ListDatasource<RecentlyAccessedMenuItem> {
  protected endpoint(): string { return 'api/home/last-accessed-menus'; }
}
