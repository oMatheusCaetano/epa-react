import GetApiDataSource, { IGetApiDataSourceParams } from '~/core/data/datasources/api/get-api-datasource';
import IPost from '~/features/CorporateWall/domain/models/IPost';
import { fromJson, ApiData, endpoint } from '.';

class GetPosts extends GetApiDataSource<IPost, ApiData, IGetApiDataSourceParams<IPost>> {
  protected setEndpoint() { this.endpoint = endpoint; }

  protected convert(data: ApiData): IPost { return fromJson(data); }
}

export default GetPosts;
