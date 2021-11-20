import ListDatasource from '~/core/data/datasources/ListDatasource';
import { Cliente } from '~/features/Users/domain/models';

export default class GetClientes extends ListDatasource<Cliente> {
  protected endpoint(): string { return 'api/clientes'; }
}
