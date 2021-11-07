import { IPostCategory } from '~/features/CorporateWall/domain/models';

export { default as GetPostsCategories } from './get-posts-categories';

export const endpoint = 'api/comunicacao-mural/categorias';

export interface ApiData {
  codigo: number;
  descricao: string;
}

export function fromJson(data: ApiData): IPostCategory {
  return {
    ...data,
    id: data.codigo,
    title: data.descricao,
  };
}
