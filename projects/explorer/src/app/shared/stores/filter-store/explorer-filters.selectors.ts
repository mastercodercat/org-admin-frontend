import { createFeatureSelector, createSelector } from '@ngrx/store';
import {explorerFiltersFeatureKey, FilterState} from './explorer-filters.reducer';

export const listSelectedFilter = createFeatureSelector<FilterState>(explorerFiltersFeatureKey);

export const filterList = createSelector(listSelectedFilter, selectAll => selectAll);
