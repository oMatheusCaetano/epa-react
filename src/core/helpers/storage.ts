import { IMenuItem } from '~/features/System/domain/models';

export enum StorageToken {
  MENUS = '@EPA:menus',
  LAST_ACCESSED_MENUS = '@EPA:lastAccessedMenus',
}

export const STORAGE = {
  setMenus(menus: IMenuItem[], token = StorageToken.MENUS) {
    return STORAGE.set(menus, token);
  },

  getMenus(token = StorageToken.MENUS): IMenuItem[] {
    return STORAGE.get(token) ?? [];
  },

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
};
