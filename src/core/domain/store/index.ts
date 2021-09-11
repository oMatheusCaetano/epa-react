import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AUTH from '~/features/Auth/domain/store/auth';
import PERSONAL_GOAL from '~/features/PersonalGoals/domain/store/personal-goal';
import FIB from '~/features/GrossInternalHappiness/domain/store/fib';

const store = configureStore({
  reducer: {
    AUTH,
    FIB,
    PERSONAL_GOAL,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;