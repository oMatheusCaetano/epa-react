import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { QueryParams } from '~/core/data/datasources/GetDatasource';

import AUTH from '~/features/Auth/domain/stores/auth';
import MENU from '~/features/System/domain/stores/menu';
import SYSTEM from '~/features/System/domain/stores/system';
import MANAGEMENT_UNIT from '~/features/ManagementUnits/domain/stores/management-unit';

const store = configureStore({
  reducer: {
    AUTH,
    MENU,
    MANAGEMENT_UNIT,
    SYSTEM,
  },
});

export type StoreQueryParams = { query: QueryParams };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
