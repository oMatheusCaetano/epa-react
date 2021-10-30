import { ListDatasource } from '~/core/data/datasources/api';
import { ApiData, fromJson, Withes, endpoint } from '~/features/CorporateWall/data/datasources/post';
import { IPost } from '~/features/CorporateWall/domain/models';

export default class GetPosts extends ListDatasource<IPost, ApiData, Withes> {
  fromApi(data: ApiData) { return fromJson(data); }

  getEndpoint() { return endpoint; }
}
