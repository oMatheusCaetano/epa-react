import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/store';
import { GetSystemInfo } from '~/features/System/data/datasources/system';
import { ISystemInfo } from '~/features/System/domain/models';

const store = createSlice({
  name: 'System',
  initialState: {
    loading: false,
    error: '',
    systemInfo: {} as ISystemInfo,
  },
  reducers: {
    setSystemInfo: (state, { payload }: PayloadAction<ISystemInfo>) => {
      state.systemInfo = payload;
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
  setSystemInfo,
  setError,
} = store.actions;

export function getSystemInfo(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    return new GetSystemInfo().exec({
      onSuccess: (systemInfo) => {
        dispatch(setError(''));
        dispatch(setSystemInfo(systemInfo));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}
