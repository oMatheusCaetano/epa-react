import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import AUTH from '~/features/Auth/domain/store/auth';
import SYSTEM from '~/features/System/domain/store/system';
import MENU from '~/features/System/domain/store/menu';
import PERSONAL_GOAL from '~/features/PersonalGoals/domain/store/personal-goal';
import FIB from '~/features/GrossInternalHappiness/domain/store/fib';
import CORPORATE_WALL from '~/features/CorporateWall/domain/store';
import MANAGEMENT_UNIT from '~/features/ManagementUnits/domain/store';

const store = configureStore({
  reducer: {
    AUTH,
    SYSTEM,
    MENU,
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
