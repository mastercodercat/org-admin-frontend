import { createAction, props } from '@ngrx/store';

export const geoFilterExplorerApplied = createAction(
  '[ExplorerGeoFilters] Geo-Filter ExplorerFilters Success',
  props<{ geoFilters: any }>(),
);

export const geoFilterExplorerSaved = createAction(
  '[ExplorerGeoFilters] Geo-Filter ExplorerFilters Saved',
  props<{ geoFiltersSaved: any }>(),
);
