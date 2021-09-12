import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '~/core/domain/store';
import GetFibEmotions, { IGetFibEmotionsFilters } from '~/features/GrossInternalHappiness/data/datasources/fib-emotions/get-fib-emotions';
import IFibEmotion from '~/features/GrossInternalHappiness/domain/models/IFibEmotion';
import helpers from '~/core/helpers';

const store = createSlice({
  name: 'Fib',
  initialState: {
    loading: false,
    error: '',
    fibTodaysImage: `figuras/img_fib/dica_${helpers.MATH.random(1, 44)}.jpg`,
    fibEmotions: [] as IFibEmotion[],
  },
  reducers: {
    setFibEmotions: (state, { payload }: PayloadAction<IFibEmotion[]>) => {
      state.fibEmotions = payload;
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
  setFibEmotions,
  setLoading,
  setError,
} = store.actions;

export function getFibEmotions({ filters = {} as IGetFibEmotionsFilters }): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    new GetFibEmotions({
      onSuccess: (data) => dispatch(setFibEmotions(data)),
      onError: (error) => dispatch(setError(error.message)),
      filters,
    }).exec();
    dispatch(setLoading(false));
  };
}
