import { User } from '~/features/Users/domain/models';
import { PostCategory } from '~/features/CorporateWall/domain/models';

interface Post {
  codigo: number;
  ativo?: boolean;
  titulo?: string;
  descricao?: string;
  data_inclusao?: string;
  data_publicacao?: string;
  texto_release?: string;
  layout?: number;
  usuario_inclusao?: number | User;
  categoria?: number | PostCategory;
}

export default Post;
