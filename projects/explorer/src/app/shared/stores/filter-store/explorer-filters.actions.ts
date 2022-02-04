import { createAction, props } from '@ngrx/store';
import { FilterOption, FilterModel } from '../../models/filters.model';

export const filterExplorerApplied = createAction(
  '[ExplorerFilters] Filter ExplorerFilterss Success',
  props<{ filters: FilterOption }>(),
);

export const filterExplorerSelected = createAction(
  '[ExplorerFilters] Filter is selected but not applied',
  props<{ selected: boolean }>(),
);

export const filterExplorerApplyFilters = createAction(
  '[ExplorerFilters] Apply filters',
  props<{ applyFilters: boolean }>(),
);

export const filterStringifiedFilters = createAction(
  '[ExplorerFilters] Apply stringified filters',
  props<{ stringifiedFilters: string }>(),
);

export const filterExplorerApplyButtonClicked = createAction(
  '[ExplorerFilters] Apply filters',
  props<{ applyButtonClicked: boolean }>(),
);

export const filterExplorerSaveCommunityActive = createAction(
  '[ExplorerFilters] Is the save button active',
  props<{ saveButtonActive: boolean }>(),
);

export const filterExplorerSaveCommunityClicked = createAction(
  '[ExplorerFilters] Is the save button was clicked',
  props<{ saveButtonClicked: boolean }>(),
);

export const filterExplorerCommunityUpdated = createAction(
  '[ExplorerFilters] When a community is updated',
  props<{ communityUpdated: boolean }>(),
);

export const savedCommunitySelected = createAction(
  '[ExplorerFilters] When a community is selected',
  props<{ communitySelected: boolean }>(),
);

export const usChartsData = createAction(
  '[ExplorerFilters] Chart data for US national (because I\'m lazy)',
  props<{ usChart: any[] }>(),
);

export const stateChartsData = createAction(
  '[ExplorerFilters] Chart data for selected state (because I\'m lazy)',
  props<{ stateChart: any }>(),
);

export const compareDropdown = createAction(
  '[ExplorerFilters] The state of the compare dropdown (because I\'m lazy)',
  props<{ compareDropdown: string }>(),
);
