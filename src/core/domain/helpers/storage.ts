import { ManagementUnitHierarchy } from '~/features/ManagementUnits/domain/models';

export enum StorageToken {
  MENUS = '@EPA:menus',
  LAST_ACCESSED_MENUS = '@EPA:lastAccessedMenus',
}

export enum ManagementUnitHierarchyToken {
  ALL = '@EPA:unidadesGerenciais',
  UEN = '@EPA:unidadesGerenciaisUen',
  STRATEGY = '@EPA:unidadesGerenciaisEstrategicas',
  BELONGS = '@EPA:unidadesGerenciaisPertence',
  MANAGES = '@EPA:unidadesGerenciaisGerencia',
  COMMUNICATE = '@EPA:unidadesGerenciaisComunica',
}

export const STORAGE = {
  set(data: unknown, token: StorageToken): boolean {
    try {
      localStorage.setItem(token, JSON.stringify(data));
      return true;
    } catch (_) {
      return false;
    }
  },

  get(token: StorageToken) {
    const item = localStorage.getItem(token);
    return item ? JSON.parse(item) : null;
  },

  clearAll() {
    localStorage.clear();
  },

  getManagementUnitsHierarchy(
    token: ManagementUnitHierarchyToken | string,
  ): ManagementUnitHierarchy[] {
    const cachedManagementUnitsString = localStorage.getItem(token);
    if (!cachedManagementUnitsString?.length) return [];
    return JSON.parse(cachedManagementUnitsString);
  },
};
