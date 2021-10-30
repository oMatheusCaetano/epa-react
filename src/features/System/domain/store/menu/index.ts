import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/store';
import GetLastAccessedMenus from '~/features/System/data/datasources/menu/get-last-accesses-menus-datasource';
import { IMenuItem } from '~/features/System/domain/models';

const store = createSlice({
  name: 'Menu',
  initialState: {
    loading: false,
    error: '',
    lastAccessedMenus: [] as IMenuItem[],
  },
  reducers: {
    setLastAccessedMenus: (state, { payload }: PayloadAction<IMenuItem[]>) => {
      state.lastAccessedMenus = payload;
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
  setError,
} = store.actions;

export function getLastAccessedMenus(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    return new GetLastAccessedMenus().exec({
      onSuccess: (menus) => {
        dispatch(setError(''));
        dispatch(setLastAccessedMenus(menus as IMenuItem[]));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}
