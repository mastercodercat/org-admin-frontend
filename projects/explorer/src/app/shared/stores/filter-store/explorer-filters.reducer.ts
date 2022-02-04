import { createReducer, on } from '@ngrx/store';
import * as ExplorerFiltersActions from './explorer-filters.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FilterModel } from '../../models/filters.model';
import {
  compareDropdown,
  filterExplorerApplyButtonClicked,
  filterExplorerApplyFilters, filterExplorerCommunityUpdated,
  filterExplorerSaveCommunityActive, filterExplorerSaveCommunityClicked,
  filterExplorerSelected, filterStringifiedFilters, savedCommunitySelected, usChartsData,
} from './explorer-filters.actions';

export const explorerFiltersFeatureKey = 'explorerFilters';

export interface FilterState extends EntityState<FilterModel>{
  error: any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: FilterState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
});


export const reducer = createReducer(
  initialState,

  // on(ExplorerFiltersActions.filterExplorerApplied,
  //   (state, action) => adapter.setAll(action.filters, state),
  // ),

  on(ExplorerFiltersActions.filterExplorerApplied,
    (state, action) => ({
      ...state,
      filters: action.filters,
    }),
  ),
  on(ExplorerFiltersActions.filterExplorerSelected,
    (state, action) => ({
      ...state,
      selected: action,
    }),
  ),

  on(ExplorerFiltersActions.filterExplorerApplyFilters,
    (state, action) => ({
      ...state,
      applyFilters: action,
    }),
  ),

  on(ExplorerFiltersActions.filterStringifiedFilters,
    (state, action) => ({
      ...state,
      stringifiedFilters: action,
    }),
  ),

  on(ExplorerFiltersActions.filterExplorerApplyButtonClicked,
    (state, action) => ({
      ...state,
      applyButtonClicked: action,
    }),
  ),

  on(ExplorerFiltersActions.filterExplorerSaveCommunityActive,
    (state, action) => ({
      ...state,
      saveButtonActive: action,
    }),
  ),

  on(ExplorerFiltersActions.filterExplorerSaveCommunityClicked,
    (state, action) => ({
      ...state,
      saveButtonClicked: action,
    }),
  ),

  on(ExplorerFiltersActions.filterExplorerCommunityUpdated,
    (state, action) => ({
      ...state,
      communityUpdated: action,
    }),
  ),

  on(ExplorerFiltersActions.savedCommunitySelected,
    (state, action) => ({
      ...state,
      communitySelected: action,
    }),
  ),

  on(ExplorerFiltersActions.usChartsData,
    (state, action) => ({
      ...state,
      usChart: action,
    }),
  ),

  on(ExplorerFiltersActions.stateChartsData,
    (state, action) => ({
      ...state,
      stateChart: action,
    }),
  ),

  on(ExplorerFiltersActions.compareDropdown,
    (state, action) => ({
      ...state,
      compareDropdown: action,
    }),
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
