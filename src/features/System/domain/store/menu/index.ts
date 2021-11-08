import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/store';
import { STORAGE, StorageToken } from '~/core/helpers';
import { GetLastAccessedMenus, GetMenusList } from '~/features/System/data/datasources/menu';
import { IMenuItem } from '~/features/System/domain/models';

const store = createSlice({
  name: 'Menu',
  initialState: {
    loading: false,
    error: '',
    lastAccessedMenus: [] as IMenuItem[],
    menusList: [] as IMenuItem[],
  },
  reducers: {
    setLastAccessedMenus: (state, { payload }: PayloadAction<IMenuItem[]>) => {
      state.lastAccessedMenus = payload;
    },

    setMenusList: (state, { payload }: PayloadAction<IMenuItem[]>) => {
      state.menusList = payload;
    },

    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export default store.reducer;
export const {
  setLoading,
  setLastAccessedMenus,
  setMenusList,
  setError,
} = store.actions;

export function getMenusList(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    const menus = STORAGE.getMenus();

    if (menus.length) {
      dispatch(setMenusList(menus));
    }

    return new GetMenusList().exec({
      onSuccess: (menus) => {
        dispatch(setError(''));
        dispatch(setMenusList(menus as IMenuItem[]));
        STORAGE.setMenus(menus as IMenuItem[]);
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}

export function getLastAccessedMenus(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    const menus = STORAGE.getMenus(StorageToken.LAST_ACCESSED_MENUS);

    if (menus.length) {
      dispatch(setLastAccessedMenus(menus));
    }

    return new GetLastAccessedMenus().exec({
      onSuccess: (menus) => {
        dispatch(setError(''));
        dispatch(setLastAccessedMenus(menus as IMenuItem[]));
        STORAGE.setMenus(menus as IMenuItem[], StorageToken.LAST_ACCESSED_MENUS);
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}
