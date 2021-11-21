import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManagementUnitHierarchyToken, STORAGE } from '~/core/domain/helpers';
import { AppDispatch, AppThunk } from '~/core/domain/stores';
import { ManagementUnitHierarchy } from '~/features/ManagementUnits/domain/models';

export enum ManagementUnitHierarchyType {
  ALL = 'ALL',
  UEN = 'UEN',
  STRATEGY = 'STRATEGY',
  BELONGS = 'BELONGS',
  MANAGES = 'MANAGES',
  COMMUNICATE = 'COMMUNICATE',
}

const store = createSlice({
  name: 'ManagementUnit',
  initialState: {
    loading: false,
    error: '',
    managementUnitsHierarchy: [] as ManagementUnitHierarchy[],
    managementUnitsHierarchyUen: [] as ManagementUnitHierarchy[],
    managementUnitsHierarchyStrategy: [] as ManagementUnitHierarchy[],
    managementUnitsHierarchyBelongs: [] as ManagementUnitHierarchy[],
    managementUnitsHierarchyManages: [] as ManagementUnitHierarchy[],
    managementUnitsHierarchyCommunicates: [] as ManagementUnitHierarchy[],
  },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },

    setManagementUnitsHierarchy: (
      state,
      { payload }: PayloadAction<{
        units: ManagementUnitHierarchy[],
        type: ManagementUnitHierarchyType
      }>,
    ) => {
      switch (payload.type) {
        case ManagementUnitHierarchyType.UEN:
          state.managementUnitsHierarchyUen = payload.units;
          return;

        case ManagementUnitHierarchyType.STRATEGY:
          state.managementUnitsHierarchyStrategy = payload.units;
          return;

        case ManagementUnitHierarchyType.BELONGS:
          state.managementUnitsHierarchyBelongs = payload.units;
          return;

        case ManagementUnitHierarchyType.MANAGES:
          state.managementUnitsHierarchyManages = payload.units;
          return;

        case ManagementUnitHierarchyType.COMMUNICATE:
          state.managementUnitsHierarchyCommunicates = payload.units;
          return;

        default:
          state.managementUnitsHierarchy = payload.units;
      }
    },
  },
});

export function handleManagementUnitsHierarchy(type: ManagementUnitHierarchyType): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = STORAGE.getManagementUnitsHierarchy(ManagementUnitHierarchyToken[type]);
    dispatch(setManagementUnitsHierarchy({ units, type }));
  };
}

export default store.reducer;
export const {
  setManagementUnitsHierarchy,
  setLoading,
  setError,
} = store.actions;
