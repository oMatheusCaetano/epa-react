import DeleteApiDataSource from '~/core/data/datasources/api/delete-api-datasource';
import { endpoint } from '.';

export default class DeletePersonalGoal extends DeleteApiDataSource {
  protected setEndpoint() { this.endpoint = endpoint; }
}
