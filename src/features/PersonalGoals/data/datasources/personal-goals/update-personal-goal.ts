import UpdateApiDataSource from '~/core/data/datasources/api/update-api-datasource';
import IPersonalGoal from '~/features/PersonalGoals/domain/models/IPersonalGoal';
import { fromJson, toJson, ApiData, endpoint } from '.';

class UpdatePersonalGoal extends UpdateApiDataSource<IPersonalGoal, ApiData> {
  protected setEndpoint() { this.endpoint = endpoint; }

  protected convertToSend() { return toJson(this.params.data); }

  protected convert(data: ApiData): IPersonalGoal { return fromJson(data); }
}

export default UpdatePersonalGoal;
