import GetApiDataSource, { IGetApiDataSourceParams } from '~/core/data/datasources/api/get-api-datasource';
import IFibEmotion from '~/features/GrossInternalHappiness/domain/models/IFibEmotion';
import { ApiData, fromJson, endpoint } from '.';

export interface IGetFibEmotionsFilters {
  active?: boolean;
}

export interface IGetFibEmotionsParams extends IGetApiDataSourceParams<IFibEmotion> {
  filters?: IGetFibEmotionsFilters;
}

class GetFibEmotions extends GetApiDataSource<IFibEmotion, ApiData, IGetFibEmotionsParams> {
  protected setEndpoint() { this.endpoint = endpoint; }

  convert(data: ApiData): IFibEmotion { return fromJson(data); }

  handleQueryParams(): void {
    super.handleQueryParams();
    if (!this.params.filters) return;
    this.addQueryParam(this.params.filters.active, 'ativo', this.params.filters.active ? 1 : 0);
  }
}

export default GetFibEmotions;
