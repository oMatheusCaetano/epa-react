import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import GLOBAL from './global';
import AUTH from '~/features/Auth/domain/store/auth';
import PERSONAL_GOAL from '~/features/PersonalGoals/domain/store/personal-goal';
import FIB from '~/features/GrossInternalHappiness/domain/store/fib';
import CORPORATE_WALL from '~/features/CorporateWall/domain/store';
import MANAGEMENT_UNIT from '~/features/ManagementUnities/domain/store';

const store = configureStore({
  reducer: {
    GLOBAL,
    AUTH,
    CORPORATE_WALL,
    FIB,
    PERSONAL_GOAL,
    MANAGEMENT_UNIT,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
