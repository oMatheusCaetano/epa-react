import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '~/core/domain/store';
import IManagementUnitHierarchy from '~/features/ManagementUnits/domain/models/IManagementUnitHierarchy';
import { fromJson, ApiData } from '~/features/ManagementUnits/domain/data/datasources/managementUnitHierarchy';

const store = createSlice({
  name: 'CorporateWall',
  initialState: {
    loading: false,
    error: '',
    managementUnitsHierarchy: [] as IManagementUnitHierarchy[],
    managementUnitsHierarchyUen: [] as IManagementUnitHierarchy[],
    managementUnitsHierarchyStrategy: [] as IManagementUnitHierarchy[],
    managementUnitsHierarchyManages: [] as IManagementUnitHierarchy[],
    managementUnitsHierarchyCommunicates: [] as IManagementUnitHierarchy[],
    managementUnitsHierarchyBelongs: [] as IManagementUnitHierarchy[],
  },
  reducers: {
    setManagementUnitsHierarchy: (
      state,
      { payload }: PayloadAction<IManagementUnitHierarchy[]>,
    ) => {
      state.managementUnitsHierarchy = payload;
    },

    setManagementUnitsHierarchyUen: (
      state,
      { payload }: PayloadAction<IManagementUnitHierarchy[]>,
    ) => {
      state.managementUnitsHierarchyUen = payload;
    },

    setManagementUnitsHierarchyStrategy: (
      state,
      { payload }: PayloadAction<IManagementUnitHierarchy[]>,
    ) => {
      state.managementUnitsHierarchyStrategy = payload;
    },

    setManagementUnitsHierarchyManages: (state,
      { payload }: PayloadAction<IManagementUnitHierarchy[]>) => {
      state.managementUnitsHierarchyManages = payload;
    },

    setManagementUnitsHierarchyCommunicates: (state,
      { payload }: PayloadAction<IManagementUnitHierarchy[]>) => {
      state.managementUnitsHierarchyCommunicates = payload;
    },

    setManagementUnitsHierarchyBelongs: (state,
      { payload }: PayloadAction<IManagementUnitHierarchy[]>) => {
      state.managementUnitsHierarchyBelongs = payload;
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
  setManagementUnitsHierarchy,
  setManagementUnitsHierarchyUen,
  setManagementUnitsHierarchyStrategy,
  setManagementUnitsHierarchyManages,
  setManagementUnitsHierarchyCommunicates,
  setManagementUnitsHierarchyBelongs,
  setLoading,
  setError,
} = store.actions;

export function getManagementUnitsHierarchy(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = getCachedManagementUnits('@EPA:unidadesGerenciais');
    dispatch(setManagementUnitsHierarchy(units));
  };
}

export function getManagementUnitsHierarchyUen(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = getCachedManagementUnits('@EPA:unidadesGerenciaisUen');
    dispatch(setManagementUnitsHierarchyUen(units));
  };
}

export function getManagementUnitsHierarchyManages(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = getCachedManagementUnits('@EPA:unidadesGerenciaisGerencia');
    dispatch(setManagementUnitsHierarchyManages(units));
  };
}

export function getManagementUnitsHierarchyStrategy(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = getCachedManagementUnits('@EPA:unidadesGerenciaisEstrategicas');
    dispatch(setManagementUnitsHierarchyStrategy(units));
  };
}

export function getManagementUnitsHierarchyCommunicates(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = getCachedManagementUnits('@EPA:unidadesGerenciaisComunica');
    dispatch(setManagementUnitsHierarchyCommunicates(units));
  };
}

export function getManagementUnitsHierarchyBelongs(): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    const units = getCachedManagementUnits('@EPA:unidadesGerenciaisPertence');
    dispatch(setManagementUnitsHierarchyBelongs(units));
  };
}

function getCachedManagementUnits(token: string): IManagementUnitHierarchy[] {
  const cachedManagementUnitsString = localStorage.getItem(token);

  if (!cachedManagementUnitsString?.length) {
    return [];
  }

  const cachedManagementUnits: ApiData[] = JSON.parse(cachedManagementUnitsString);
  const units = cachedManagementUnits.map(fromJson);
  return units;
}
