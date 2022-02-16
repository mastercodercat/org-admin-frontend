import { createAction, props } from '@ngrx/store';
import { OrganizationUser } from '../../shared/models/organization-user.model';
import { Organization } from '../../shared/models/organization.model';
import { User } from '../../shared/models/user.model';

export const requestUserInfo = createAction(
  '[User] Request user info',
  props<{ uuid: string }>(),
);

export const requestUserInfoSuccess = createAction(
  '[User] Request user info success',
  props<{ user: User; orgUsers: OrganizationUser[] }>(),
);

export const requestUserInfoFailure = createAction(
  '[User] Request user info failure',
  props<{ err: any }>(),
);

export const addSelectedOrgUuid = createAction(
  '[User] Add selected organization uuid',
  props<{ selectedOrganizationUuid: string }>(),
);

export const requestOrganizations = createAction(
  '[Organization] Request user organizations',
);

export const requestOrganizationsSuccess = createAction(
  '[Organization] Request user organizations success',
  props<{ organizations: Organization[] }>(),
);

export const requestOrganizationsFailure = createAction(
  '[Organization] Request user organizations failure',
);
