import CreateDatasource from '~/core/data/datasources/CreateDatasource';
import { Kick } from '~/features/GoalAndBallOut/domain/models';

export default class CreateKick extends CreateDatasource<Kick> {
  protected endpoint(): string { return 'api/golebolafora'; }
}
