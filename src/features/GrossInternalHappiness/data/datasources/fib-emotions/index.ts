export const endpoint = 'api/FibEmocoes';

export interface ApiData {
  id: number,
  descricao: string,
  ativo: boolean,
}

export function fromJson(data: ApiData) {
  return {
    ...data,
    description: data.descricao,
    active: data.ativo,
  };
}
