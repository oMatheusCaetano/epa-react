import IPost, { IPostData } from '~/features/CorporateWall/domain/models/IPost';

export const endpoint = 'api/comunicacao-mural';

export interface ApiData {
  codigo: number,
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
  }
}

export function toJson(data: IPost | IPostData) {
  return {
    ...data,
    descricao: data.description,
  };
}

export function fromJson(data: ApiData): IPost {
  const createdBy = data.usuario_inclusao && typeof data.usuario_inclusao !== 'number'
    ? {
      ...data.usuario_inclusao,
      id: data.usuario_inclusao.cliente.codigo,
      name: data.usuario_inclusao.cliente.nome,
      email: data.usuario_inclusao.cliente.email,
      image: data.usuario_inclusao.cliente.foto,
    }
    : undefined;

  return {
    ...data,
    id: data.codigo,
    description: data.descricao,
    createdAt: data.data_inclusao,
    publishedAt: data.data_publicacao,
    createdBy,
  };
}
