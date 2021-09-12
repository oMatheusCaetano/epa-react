import CreateApiDataSource from '~/core/data/datasources/api/create-api-datasource';
import IPersonalGoal, { IPersonalGoalData } from '~/features/PersonalGoals/domain/models/IPersonalGoal';
import { fromJson, toJson, ApiData, endpoint } from '.';

class CreatePersonalGoal extends CreateApiDataSource<IPersonalGoal, IPersonalGoalData, ApiData> {
  protected setEndpoint() { this.endpoint = endpoint; }

  protected convertToSend() { return toJson(this.params.data); }

  protected convert(data: ApiData): IPersonalGoal { return fromJson(data); }
}

export default CreatePersonalGoal;
