import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '~/core/domain/store';
import IPost from '~/features/CorporateWall/domain/models/IPost';
import GetPosts from '~/features/CorporateWall/data/datasources/post/get-posts';

const store = createSlice({
  name: 'CorporateWall',
  initialState: {
    loading: false,
    error: '',
    posts: [] as IPost[],
  },
  reducers: {
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
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
  setPosts,
  setLoading,
  setError,
} = store.actions;

// export function getPosts(): AppThunk {
//   return async function exec(dispatch: AppDispatch) {
//     dispatch(setLoading(true));
//     return new GetPosts({
//       onSuccess: (data) => {
//         dispatch(setError(''));
//         dispatch(setPosts(data));
//       },
//       onError: (error) => dispatch(setError(error.message)),
//       onFinally: () => dispatch(setLoading(false)),
//     }).exec();
//   };
// }
