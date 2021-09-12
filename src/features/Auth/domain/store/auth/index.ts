import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/store';
import GetAuthenticatedUser from '~/features/Auth/data/datasources/get-authenticated-user';
import IUser from '~/features/Auth/domain/models/IUser';

const store = createSlice({
  name: 'Auth',
  initialState: {
    loading: false,
    error: '',
    authUser: {} as IUser,
  },
  reducers: {
    setAuthUser: (state, { payload }: PayloadAction<IUser>) => {
      state.authUser = payload;
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
  setAuthUser,
  setError,
} = store.actions;

export function getAuthenticatedUser(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    new GetAuthenticatedUser({
      onSuccess: (data) => {
        dispatch(setAuthUser(data));
        dispatch(setError(''));
      },
      onError: (error) => dispatch(setError(error.message)),
      onFinally: () => dispatch(setLoading(false)),
    }).exec();
  };
}
