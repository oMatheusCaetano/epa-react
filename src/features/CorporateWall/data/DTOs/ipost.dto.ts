/* eslint-disable @typescript-eslint/no-explicit-any */
import IPost from '~/features/CorporateWall/data/models/IPost.model';

export function fromApiResponse(data: any): IPost {
  return {
    id: data.codigo,
    description: data.descricao,
    release: data.texto_release,
    title: data.titulo,
    image: data.imagem,
    category: {
      id: data.categoria.codigo,
      name: data.categoria.descricao,
    },
    createdBy: {
      id: data.codigo_cliente,
      name: data.usuario_inclusao.cliente.nome,
      photo: data.usuario_inclusao.cliente.imagem,
    },
    updatedBy: {
      id: data.codigo_cliente,
      name: data.usuario_inclusao.cliente.nome,
      photo: data.usuario_inclusao.cliente.imagem,
    },
  };
}
