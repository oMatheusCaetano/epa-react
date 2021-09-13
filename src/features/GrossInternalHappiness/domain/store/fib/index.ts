import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '~/core/domain/store';
import GetFibEmotions, { IGetFibEmotionsFilters } from '~/features/GrossInternalHappiness/data/datasources/fib-emotions/get-fib-emotions';
import IFibEmotion from '~/features/GrossInternalHappiness/domain/models/IFibEmotion';
import helpers from '~/core/helpers';
import IUserHumor, { IUserHumorData } from '~/features/GrossInternalHappiness/domain/models/IUserHumor';
import SaveUserHumor from '~/features/GrossInternalHappiness/data/datasources/user-humor/save-user-humor';

const store = createSlice({
  name: 'Fib',
  initialState: {
    loading: false,
    error: '',
    fibTodaysImage: `figuras/img_fib/dica_${helpers.MATH.random(1, 44)}.jpg`,
    fibEmotions: [] as IFibEmotion[],
    userHumor: {} as IUserHumor,
  },
  reducers: {
    setFibEmotions: (state, { payload }: PayloadAction<IFibEmotion[]>) => {
      state.fibEmotions = payload;
    },

    setUserHumor: (state, { payload }: PayloadAction<IUserHumor>) => {
      state.userHumor = payload;
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
  setUserHumor,
  setLoading,
  setError,
} = store.actions;

export function getFibEmotions({ filters = {} as IGetFibEmotionsFilters }): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    return new GetFibEmotions({
      filters,
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setFibEmotions(data));
      },
      onError: (error) => dispatch(setError(error.message)),
      onFinally: () => dispatch(setLoading(false)),
    }).exec();
  };
}

export function saveUserHumor({ humor = {} as IUserHumorData }): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    return new SaveUserHumor({
      humor,
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setUserHumor(data));
      },
      onError: (error) => dispatch(setError(error.message)),
      onFinally: () => dispatch(setLoading(false)),
    }).exec();
  };
}
