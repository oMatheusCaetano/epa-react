import { IPost, IPostCategory, IPostData } from '~/features/CorporateWall/domain/models';
import IUser from '~/features/Users/domain/models/IUser';

export { default as GetPosts } from '~/features/CorporateWall/data/datasources/post/get-posts';

export const endpoint = 'api/comunicacao-mural';

export enum Withes {
  CREATED_BY = 'usuarioInclusao',
  CATEGORY = 'categoria'
}

export interface ApiData {
  codigo: number,
  titulo: string,
  descricao: string,
  data_inclusao: string,
  data_publicacao: string,
  usuario_inclusao?: {
    login: string;
    cliente: {
      codigo: number;
      nome: string;
      email: string;
      foto: string;
    }
  },
  categoria: {
    codigo: number,
    descricao: string,
  }
}

export function toJson(data: IPost | IPostData) {
  return {
    ...data,
    descricao: data.description,
  };
}

export function fromJson(data: ApiData): IPost {
  const createdBy: IUser | undefined = data.usuario_inclusao && typeof data.usuario_inclusao === 'object'
    ? {
      ...data.usuario_inclusao,
      id: data.usuario_inclusao.cliente.codigo,
      name: data.usuario_inclusao.cliente.nome,
      email: data.usuario_inclusao.cliente.email,
      image: data.usuario_inclusao.cliente.foto,
    }
    : undefined;

  const category : IPostCategory | undefined = data.categoria && typeof data.categoria === 'object'
    ? {
      ...data.categoria,
      id: data.categoria.codigo,
      title: data.categoria.descricao,
    }
    : undefined;

  return {
    ...data,
    id: data.codigo,
    title: data.titulo,
    description: data.descricao,
    createdAt: data.data_inclusao,
    publishedAt: data.data_publicacao,
    createdBy,
    category,
  };
}
