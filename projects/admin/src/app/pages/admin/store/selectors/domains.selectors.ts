import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDomains from '../reducers/domains.reducer';

export const selectDomainsState = createFeatureSelector<fromDomains.DomainsState>(fromDomains.domainsFeatureKey);

export const selectDomains = createSelector(selectDomainsState, (state: fromDomains.DomainsState) => state.domains);
export const selectIsLoading = createSelector(selectDomainsState, (state: fromDomains.DomainsState) => state.isLoading);
