import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Organization } from '../../../../projects/admin/src/app/shared/models/organization.model';
import * as fromActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<Organization> {
  email: string;
  name: string;
  nickname: string;
  picture: string;
  selectedOrganizationUuid: string;
  addOrgsSuccess: boolean;
  addOrgsFailure: boolean;
}

export const adapter: EntityAdapter<Organization> = createEntityAdapter<Organization>({
  selectId: (org: Organization) => org.uuid,
});
export const initialState: UserState = adapter.getInitialState({
  email: '',
  name: '',
  nickname: '',
  picture: '',
  selectedOrganizationUuid: '',
  addOrgsSuccess: false,
  addOrgsFailure: false,
});


export const userReducer = createReducer(
  initialState,

  on(fromActions.addUserInfo, (state, { user }) => ({
    ...state,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    picture: user.picture,
  })),

  on(fromActions.addSelectedOrgUuid, (state, { selectedOrganizationUuid }) => ({
    ...state,
    selectedOrganizationUuid,
  })),

  on(fromActions.requestOrganizationsSuccess, (state, { organizations }) => adapter.addMany(organizations, {
    ...state,
    addOrgsSuccess: true,
    addOrgsFailure: false,
  })),

  on(fromActions.requestOrganizationsFailure, state => ({
    ...state,
    addOrgsFailure: true,
    addOrgsSuccess: false,
  })),
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
