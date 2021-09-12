import GetApiDataSource, { IGetApiDataSourceParams } from '~/core/data/datasources/api/get-api-datasource';
import IPersonalGoal from '~/features/PersonalGoals/domain/models/IPersonalGoal';
import { fromJson, ApiData, endpoint } from '.';

export type IGetPersonalGoalsParams = IGetApiDataSourceParams<IPersonalGoal> & {
  filters?: IGetPersonalGoalFilters;
}

export interface IGetPersonalGoalFilters {
  done?: boolean;
  user_id?: number;
}

class GetPersonalGoals extends GetApiDataSource<IPersonalGoal, ApiData, IGetPersonalGoalsParams> {
  protected setEndpoint() { this.endpoint = endpoint; }

  protected convert(data: ApiData): IPersonalGoal { return fromJson(data); }

  handleQueryParams() {
    super.handleQueryParams();
    const { filters } = this.params;
    if (!filters) return;
    this.addQueryParam(filters.done, 'concluido', filters.done ? 1 : '0,null');
    this.addQueryParam(filters.user_id, 'usuario', filters.user_id);
  }
}

export default GetPersonalGoals;
