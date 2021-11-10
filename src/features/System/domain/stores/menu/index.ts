import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/stores';
import { GetMenusList, GetRecentlyAccessedMenus } from '~/features/System/data/datasources/menu';
import { MenuItem, RecentlyAccessedMenuItem } from '~/features/System/domain/models';

const store = createSlice({
  name: 'Menu',
  initialState: {
    loading: false,
    error: '',
    menusList: [] as MenuItem[],
    recentlyAccessedMenus: [] as RecentlyAccessedMenuItem[],
  },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },

    setMenusList: (state, { payload }: PayloadAction<MenuItem[]>) => {
      state.menusList = payload;
    },

    setRecentlyAccessedMenus: (state, { payload }: PayloadAction<RecentlyAccessedMenuItem[]>) => {
      state.recentlyAccessedMenus = payload;
    },
  },
});

export function getMenusList(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));

    return new GetMenusList().exec({
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setMenusList(data as MenuItem[]));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}

export function getRecentlyAccessedMenus(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));

    return new GetRecentlyAccessedMenus().exec({
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setRecentlyAccessedMenus(data as RecentlyAccessedMenuItem[]));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}

export default store.reducer;
export const { setLoading, setError, setMenusList, setRecentlyAccessedMenus } = store.actions;
