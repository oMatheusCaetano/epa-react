import IMenuItem from '~/features/System/domain/models/IMenuItem';

export type { default as IMenuItem } from '~/features/System/domain/models/IMenuItem';

export * from './get-last-accesses-menus-datasource';
export { default as GetSystemInfo } from './get-last-accesses-menus-datasource';

export interface ApiData {
  link: string,
  nome_menu: string,
}

export function fromApi(data: ApiData): IMenuItem {
  return {
    ...data,
    label: data.nome_menu,
  };
}
