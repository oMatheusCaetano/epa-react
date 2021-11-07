import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '~/core/domain/store';
import { IPostCategory } from '~/features/CorporateWall/domain/models';
import { GetPostsCategories } from '~/features/CorporateWall/data/datasources/post-category';

const store = createSlice({
  name: 'CorporateWall',
  initialState: {
    postsCategories: [] as IPostCategory[],
    loading: false,
    error: '',
  },
  reducers: {
    setPostsCategories: (state, { payload }: PayloadAction<IPostCategory[]>) => {
      state.postsCategories = payload;
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
  setPostsCategories,
  setLoading,
  setError,
} = store.actions;

export function getPostsCategories(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    return new GetPostsCategories().exec({
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setPostsCategories(data as IPostCategory[]));
      },
      onFinally: () => dispatch(setLoading(false)),
    });
  };
}
