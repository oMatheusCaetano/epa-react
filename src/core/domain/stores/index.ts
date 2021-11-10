import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import MENU from '~/features/System/domain/stores/menu';
import SYSTEM from '~/features/System/domain/stores/system';

const store = configureStore({
  reducer: {
    MENU,
    SYSTEM,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
