import { createAction, props } from '@ngrx/store';
import { Organization } from 'src/app/pages/organization/shared/organization.model';
import { User } from 'src/app/shared/models/user/user.model';

export const getUser = createAction(
  '[User] Get user info',
  props<{ user: User }>()
);

export const addUserOrgs = createAction(
  '[User] Add user organizations',
  props<{ organizations: Organization[] }>()
);

export const addSelectedOrg = createAction(
  '[User] Add selected organization',
  props<{ selectedOrganization: Organization }>()
);