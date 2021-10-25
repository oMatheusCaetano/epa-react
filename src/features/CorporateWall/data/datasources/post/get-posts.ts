import ListApiDatasource from '~/core/data/datasources/api/list-api-datasource';
import { ApiData, fromJson, Withes } from '~/features/CorporateWall/data/datasources/post';
import { IPost } from '~/features/CorporateWall/domain/models';

export default class GetPosts extends ListApiDatasource<IPost, ApiData, Withes> {
  fromApi(data: ApiData) { return fromJson(data); }

  getEndpoint() { return 'api/comunicacao-mural'; }
}
