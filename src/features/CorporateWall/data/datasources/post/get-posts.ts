import ListDatasource from '~/core/data/datasources/ListDatasource';
import { Post } from '~/features/CorporateWall/domain/models';

export default class GetPosts extends ListDatasource<Post> {
  protected endpoint(): string { return 'api/comunicacao-mural'; }
}
