import { IUser } from '~/features/Users/domain/models';

export type { IUser } from '~/features/Users/domain/models';
export * from './get-authenticated';
export { default as GetAuthenticated } from './get-authenticated';

export enum Withes {
  CUSTOMER = 'cliente',
}

export interface ApiData {
  codigo_cliente: number;
  login: string;
  cliente?: {
    nome: string;
    email?: string;
    foto?: string;
  }
}

export function fromApi(data: ApiData): IUser {
  return {
    ...data,
    id: data.codigo_cliente,
    name: data.cliente?.nome,
    email: data.cliente?.email,
    image: data.cliente?.foto,
  };
}
