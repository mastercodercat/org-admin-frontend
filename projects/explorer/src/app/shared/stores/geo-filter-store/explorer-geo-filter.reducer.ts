import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as ExplorerGeoFilterActions from './explorer-geo-filter.actions';
import { GeoFilterModel } from '../../models/geo-filters.model';

export const explorerGeoFilterFeatureKey = 'explorerGeoFilter';

export interface GeoFilterState extends EntityState<GeoFilterModel> {
  geoFiltersSaved: any;
  geoFilters: any;
  error: any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: GeoFilterState = adapter.getInitialState({
  geoFiltersSaved: undefined,
  geoFilters: undefined,
  error: undefined,
});


export const reducer = createReducer(
  initialState,

  // on(ExplorerGeoFilterActions.geoFilterExplorerApplied,
  //   (state, action) => adapter.setAll(action.geoFilters, state),
  // ),

  on(ExplorerGeoFilterActions.geoFilterExplorerApplied,
    (state, action) => ({
      ...state,
      geoFilters: action,
    }),
  ),

  on(ExplorerGeoFilterActions.geoFilterExplorerSaved,
    (state, action) => ({
      ...state,
      geoFiltersSaved: action,
    }),
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
