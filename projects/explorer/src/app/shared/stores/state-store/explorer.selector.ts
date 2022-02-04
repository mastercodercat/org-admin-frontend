import { createFeatureSelector, createSelector } from '@ngrx/store';
import { explorersFeatureKey, ExplorerState, selectAll } from './explorer.reducer';

export const listStatesState = createFeatureSelector<ExplorerState>(explorersFeatureKey);

export const statesList = createSelector(listStatesState, selectAll);
