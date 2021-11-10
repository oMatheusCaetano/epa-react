import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/stores';
import { GetSystemInfo } from '~/features/System/data/datasources/system/get-system-info';
import { SystemInfo } from '~/features/System/domain/models';

const store = createSlice({
  name: 'System',
  initialState: {
    loading: false,
    error: '',
    systemInfo: {} as SystemInfo,
  },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },

    setSystemInfo: (state, { payload }: PayloadAction<SystemInfo>) => {
      state.systemInfo = payload;
    },
  },
});

export function getSystemInfo(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));

    return new GetSystemInfo().exec({
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setSystemInfo(data));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}

export default store.reducer;
export const { setLoading, setError, setSystemInfo } = store.actions;
