import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk, StoreQueryParams } from '~/core/domain/stores';
import { GetAuthenticatedUser } from '~/features/Auth/data/datasources/user';
import { User } from '~/features/Users/domain/models';

const store = createSlice({
  name: 'Auth',
  initialState: {
    loading: false,
    error: '',
    user: {} as User,
  },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },

    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
});

export function getAuthenticatedUser(params?: StoreQueryParams): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));

    return new GetAuthenticatedUser().exec({
      ...params?.query,
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setUser(data));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}

export default store.reducer;
export const { setLoading, setError, setUser } = store.actions;
