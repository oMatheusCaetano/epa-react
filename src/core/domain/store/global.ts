import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const store = createSlice({
  name: 'Global',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export default store.reducer;
export const { setLoading, setError } = store.actions;
