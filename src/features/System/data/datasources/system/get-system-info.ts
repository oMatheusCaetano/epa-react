import GetDatasource from '~/core/data/datasources/GetDatasource';
import { SystemInfo } from '~/features/System/domain/models';

export class GetSystemInfo extends GetDatasource<SystemInfo> {
  protected endpoint(): string { return 'api/config/basic-info'; }
}
