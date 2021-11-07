import { ListDatasource } from '~/core/data/datasources/api';
import { ApiData, fromJson, endpoint } from '.';
import { IPostCategory } from '~/features/CorporateWall/domain/models';

export default class GetPostsCategories extends ListDatasource<IPostCategory, ApiData, null> {
  fromApi(data: ApiData) { return fromJson(data); }

  getEndpoint() { return endpoint; }
}
