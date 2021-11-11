import GetDatasource from '~/core/data/datasources/GetDatasource';
import { User } from '~/features/Users/domain/models';

export default class GetAuthenticatedUser extends GetDatasource<User> {
  protected endpoint(): string { return 'api/auth/usuario'; }
}
