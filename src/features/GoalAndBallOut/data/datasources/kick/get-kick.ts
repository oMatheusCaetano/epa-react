import ShowDatasource, { ShowDatasourceParams } from '~/core/data/datasources/ShowDatasource';
import { Kick } from '~/features/GoalAndBallOut/domain/models';

export default class GetKick extends ShowDatasource<Kick> {
  protected endpoint(params: ShowDatasourceParams<Kick>): string {
    return `api/golebolafora/${params.id}`;
  }
}
