import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, AppThunk } from '~/core/domain/store';
import DeletePersonalGoal from '~/features/PersonalGoals/data/datasources/personal-goals/delete-personal-goal';
import UpdatePersonalGoal from '~/features/PersonalGoals/data/datasources/personal-goals/update-personal-goal';
import GetPersonalGoals, { IGetPersonalGoalFilters } from '~/features/PersonalGoals/data/datasources/personal-goals/get-personal-goals';
import IPersonalGoal from '~/features/PersonalGoals/domain/models/IPersonalGoal';
import CreatePersonalGoal, { IPersonalGoalData } from '~/features/PersonalGoals/data/datasources/personal-goals/create-personal-goal';

const store = createSlice({
  name: 'PersonalGoal',
  initialState: {
    loading: false,
    error: '',
    personalGoals: [] as IPersonalGoal[],
  },
  reducers: {
    setPersonalGoals: (state, { payload }: PayloadAction<IPersonalGoal[]>) => {
      state.personalGoals = payload;
    },

    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },

    removePersonalGoal: (state, { payload }: PayloadAction<number>) => {
      state.personalGoals = state.personalGoals.filter((goal) => goal.id !== payload);
    },

    changePersonalGoal: (state, { payload }: PayloadAction<IPersonalGoal>) => {
      const index = state.personalGoals.findIndex((goal) => goal.id === payload.id);
      state.personalGoals[index] = payload;
    },

    addPersonalGoal: (state, { payload }: PayloadAction<IPersonalGoal>) => {
      state.personalGoals.push(payload);
    },
  },
});

export default store.reducer;
export const {
  setPersonalGoals,
  setLoading,
  setError,
  removePersonalGoal,
  changePersonalGoal,
  addPersonalGoal,
} = store.actions;

export function getPersonalGoals({ filters = {} as IGetPersonalGoalFilters }): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    new GetPersonalGoals({
      filters,
      onSuccess: (data) => {
        dispatch(setError(''));
        dispatch(setPersonalGoals(data));
      },
      onError: (error) => dispatch(setError(error.message)),
    }).exec();
    dispatch(setLoading(false));
  };
}

export function deletePersonalGoal(
  id: number,
  { reload = false, reloadFilters = {} as IGetPersonalGoalFilters },
): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    new DeletePersonalGoal({
      personalGoalId: id,
      onSuccess: () => {
        dispatch(removePersonalGoal(id));
        dispatch(setError(''));
      },
      onError: (error) => dispatch(setError(error.message)),
      onfinally: () => {
        if (reload) {
          dispatch(getPersonalGoals({ filters: reloadFilters }));
        }

        dispatch(setLoading(false));
      },
    }).exec();
  };
}

export function updatePersonalGoal(
  personalGoal: IPersonalGoal,
  { reload = false, reloadFilters = {} as IGetPersonalGoalFilters },
): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    new UpdatePersonalGoal({
      personalGoal,
      onSuccess: (goal) => {
        dispatch(changePersonalGoal(goal));
        dispatch(setError(''));
      },
      onError: (error) => dispatch(setError(error.message)),
      onfinally: () => {
        if (reload) {
          dispatch(getPersonalGoals({ filters: reloadFilters }));
        }

        dispatch(setLoading(false));
      },
    }).exec();
  };
}

export function createPersonalGoal(
  personalGoal: IPersonalGoalData,
  { reload = false, reloadFilters = {} as IGetPersonalGoalFilters },
): AppThunk {
  return async function exec(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    new CreatePersonalGoal({
      personalGoal,
      onSuccess: (goal) => {
        dispatch(addPersonalGoal(goal));
        dispatch(setError(''));
      },
      onError: (error) => dispatch(setError(error.message)),
      onfinally: () => {
        if (reload) {
          dispatch(getPersonalGoals({ filters: reloadFilters }));
        }

        dispatch(setLoading(false));
      },
    }).exec();
  };
}
