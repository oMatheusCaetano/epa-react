import IPost, { IPostData } from '~/features/CorporateWall/domain/models/IPost';

export const endpoint = 'api/comunicacao-mural';

export interface ApiData {
  codigo: number,
  descricao: string,
}

export function toJson(data: IPost | IPostData) {
  return {
    ...data,
    descricao: data.description,
  };
}

export function fromJson(data: ApiData): IPost {
  return {
    ...data,
    id: data.codigo,
    description: data.descricao,
  };
}
