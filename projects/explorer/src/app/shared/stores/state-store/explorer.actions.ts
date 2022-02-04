import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { StateModel } from '../../models/states.model';

// Getting and loading states data into stores
export const loadExplorersStates = createAction(
  '[Explorer US Map States Component] Load Explorers States ',
);

export const loadExplorersStatesSuccess = createAction(
  '[Explorer State Effect] Load Explorers States Success',
  props<{ states: StateModel[] }>(),
);

export const loadExplorersStatesFailure = createAction(
  '[Explorer State Effect] Load Explorers States For Map Failure',
  props<{ error: any }>(),
);

export const loadCounties = createAction(
  '[Explorer/API] Update Explorer',
  props<{ states: Update<any> }>(),
);

// export const loadCounties = createAction(
//   '[Explorer US Map States Component / States Tree component] Load Counties for a specific state',
//   props<{ states: StateModel }>()
// );


// boiler plate examples
//
// export const loadExplorers = createAction(
//   '[Explorer/API] Load Explorers',
//   props<{ explorers: Explorer[] }>()
// );
//
// export const addExplorer = createAction(
//   '[Explorer/API] Add Explorer',
//   props<{ explorer: Explorer }>()
// );
//
// export const upsertExplorer = createAction(
//   '[Explorer/API] Upsert Explorer',
//   props<{ explorer: Explorer }>()
// );
//
// export const addExplorers = createAction(
//   '[Explorer/API] Add Explorers',
//   props<{ explorers: Explorer[] }>()
// );
//
// export const upsertExplorers = createAction(
//   '[Explorer/API] Upsert Explorers',
//   props<{ explorers: Explorer[] }>()
// );
//
// export const updateExplorer = createAction(
//   '[Explorer/API] Update Explorer',
//   props<{ explorer: Update<Explorer> }>()
// );
//
// export const updateExplorers = createAction(
//   '[Explorer/API] Update Explorers',
//   props<{ explorers: Update<Explorer>[] }>()
// );
//
// export const deleteExplorer = createAction(
//   '[Explorer/API] Delete Explorer',
//   props<{ id: string }>()
// );
//
// export const deleteExplorers = createAction(
//   '[Explorer/API] Delete Explorers',
//   props<{ ids: string[] }>()
// );
//
// export const clearExplorers = createAction(
//   '[Explorer/API] Clear Explorers'
// );
