import { createAction, props } from '@ngrx/store';
import { Organization } from '../../shared/models/organization.model';
import { User } from '../../shared/models/user.model';

export const requestUserInfo = createAction(
  '[User] Request user info',
);

export const addUserInfo = createAction(
  '[User] Add user info',
  props<{ user: User }>()
);

export const addSelectedOrgUuid = createAction(
  '[User] Add selected organization uuid',
  props<{ selectedOrganizationUuid: string }>()
);

export const requestOrganizations = createAction(
  '[Organization] Request user organizations',
);

export const requestOrganizationsSuccess = createAction(
  '[Organization] Request user organizations success',
  props<{ organizations: Organization[] }>()
);

export const requestOrganizationsFailure = createAction(
  '[Organization] Request user organizations failure',
);
