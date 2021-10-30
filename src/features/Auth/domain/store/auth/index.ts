import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/store';
import { GetAuthenticated, Withes } from '~/features/Auth/data/datasources/user';
// import GetAuthenticatedUser from '~/features/Auth/data/datasources/get-authenticated-user';
import IUser from '~/features/Users/domain/models/IUser';

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
    return new GetAuthenticated().exec({
      with: { value: [Withes.CUSTOMER] },
      onSuccess: (user) => {
        dispatch(setError(''));
        dispatch(setAuthUser(user));
      },
      onFinally: () => {
        dispatch(setLoading(false));
      },
    });
  };
}
