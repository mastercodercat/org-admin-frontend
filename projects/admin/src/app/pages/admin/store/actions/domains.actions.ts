import { createAction, props } from '@ngrx/store';
import { Domain } from '../../components/landing-page-domains/domain.model';

export const loadDomains = createAction(
  '[Domains] Load Domains',
);

export const loadDomainsSuccess = createAction(
  '[Domains] Load Domains Success',
  props<{ domains: Domain[] }>(),
);

export const loadDomainsFailure = createAction(
  '[Domains] Load Domains Failure',
  props<{ error: string }>(),
);

export const deleteDomain = createAction(
  '[Domains] Delete Domain',
  props<{ uuid: string }>(),
);

export const deleteDomainSuccess = createAction(
  '[Domains] Delete Domain Success',
  props<{ uuid: string }>(),
);

export const deleteDomainFailure = createAction(
  '[Domains] Delete Domain Failure',
  props<{ error: string }>(),
);
