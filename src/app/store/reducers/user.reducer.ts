import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/user.actions';
import { User } from '../../shared/models/user.model';
import { organizationAdapter, OrganizationState } from './organization.entity';
import { organizationUserAdapter, OrganizationUserState } from './organization-user.entity';

export const userFeatureKey = 'user';

export interface UserState extends User {
  organizations: OrganizationState;
  organizationUsers: OrganizationUserState;
  addOrgsSuccess: boolean;
  addOrgsFailure: boolean;
}

export const initialState: UserState = {
  uuid: '',
  email: '',
  firstName: '',
  lastName: '',
  selectedOrganizationUuid: '',
  organizations: organizationAdapter.getInitialState(),
  organizationUsers: organizationUserAdapter.getInitialState(),
  addOrgsSuccess: false,
  addOrgsFailure: false,
};


export const userReducer = createReducer(
  initialState,

  on(fromActions.requestUserInfoSuccess, (state, { user, orgUsers }) => ({
    ...state,
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    organizationUsers: organizationUserAdapter.addMany(orgUsers, state.organizationUsers),
  })),

  on(fromActions.addSelectedOrgUuid, (state, { selectedOrganizationUuid }) => ({
    ...state,
    selectedOrganizationUuid,
  })),

  on(fromActions.requestOrganizationsSuccess, (state, { organizations }) => ({
    ...state,
    addOrgsSuccess: true,
    addOrgsFailure: false,
    organizations: organizationAdapter.addMany(organizations, state.organizations),
  })),

  on(fromActions.requestOrganizationsFailure, state => ({
    ...state,
    addOrgsFailure: true,
    addOrgsSuccess: false,
  })),
);

export const {
  selectAll: selectAllOrganizations,
  selectEntities: selectOrganizationEntities,
  selectIds: selectOrganizationIds,
  selectTotal: selectTotalOrganizations,
} = organizationAdapter.getSelectors();

export const {
  selectAll: selectAllOrganizationUsers,
  selectEntities: selectOrganizationUserEntities,
  selectIds: selectOrganizationUserIds,
  selectTotal: selectTotalOrganizationUsers,
} = organizationUserAdapter.getSelectors();
