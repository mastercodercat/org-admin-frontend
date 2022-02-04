import { createFeatureSelector, createSelector } from '@ngrx/store';
import {explorerGeoFilterFeatureKey, GeoFilterState} from './explorer-geo-filter.reducer';

export const listSelectedGeoFilter = createFeatureSelector<GeoFilterState>(explorerGeoFilterFeatureKey);

export const geoFilterList = createSelector(listSelectedGeoFilter, geoSelectAll => geoSelectAll);
