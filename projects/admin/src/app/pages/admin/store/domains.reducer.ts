import { createReducer, on } from '@ngrx/store';
import { Domain } from '../components/landing-page-domains/domain.model';
import * as fromActions from './domains.actions';

export const domainsFeatureKey = 'domains';

export interface DomainsState {
  domains: Domain[];
  isLoading: boolean;
  success: boolean;
  failure: boolean;
  error: string;
}

export const initialState: DomainsState = {
  domains: [],
  isLoading: true,
  success: false,
  failure: false,
  error: '',
};

export const domainsReducer = createReducer(
  initialState,

  on(fromActions.loadDomains, state => ({
    ...state,
    isLoading: true,
  })),

  on(fromActions.loadDomainsSuccess, (state, { domains }) => ({
    ...state,
    domains,
    isLoading: false,
    success: true,
    failure: false,
  })),

  on(fromActions.loadDomainsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    success: false,
    failure: true,
    error,
  })),
);
