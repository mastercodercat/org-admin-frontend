import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { StateModel } from '../../models/states.model';
import * as ExplorerActions from './explorer.actions';

export const explorersFeatureKey = 'explorersListStates';

export interface ExplorerState extends EntityState<StateModel> {
  // additional entities state properties
  error: any;
}

export const adapter: EntityAdapter<StateModel> = createEntityAdapter<StateModel>();

export const initialState: ExplorerState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
});


export const reducer = createReducer(
  initialState,
  on(ExplorerActions.loadExplorersStatesSuccess,
    (state, action) => {
    // I left this as and example of trouble shooting a reducer
    // console.log(action.states);
    return adapter.setAll(action.states, state);
  }
  ),
  on(ExplorerActions.loadExplorersStatesFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(ExplorerActions.loadCounties,
    (state, action) => adapter.updateOne(action.states, state)
  ),


  // on(ExplorerActions.loadCounties,
  //   (state, action) => adapter.updateOne({ id: action.states.id, changes: action.states }, state)
  // ),
  // boiler plate examples
  //
  // on(ExplorerActions.addExplorer,
  //   (state, action) => adapter.addOne(action.explorer, state)
  // ),
  // on(ExplorerActions.upsertExplorer,
  //   (state, action) => adapter.upsertOne(action.explorer, state)
  // ),
  // on(ExplorerActions.addExplorers,
  //   (state, action) => adapter.addMany(action.explorers, state)
  // ),
  // on(ExplorerActions.upsertExplorers,
  //   (state, action) => adapter.upsertMany(action.explorers, state)
  // ),
  // on(ExplorerActions.updateExplorer,
  //   (state, action) => adapter.updateOne(action.explorer, state)
  // ),
  // on(ExplorerActions.updateExplorers,
  //   (state, action) => adapter.updateMany(action.explorers, state)
  // ),
  // on(ExplorerActions.deleteExplorer,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(ExplorerActions.deleteExplorers,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  // on(ExplorerActions.loadExplorers,
  //   (state, action) => adapter.setAll(action.explorers, state)
  // ),
  // on(ExplorerActions.clearExplorers,
  //   state => adapter.removeAll(state)
  // ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
