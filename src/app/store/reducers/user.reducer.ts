import { createReducer, on } from '@ngrx/store';
import { Organization } from 'src/app/pages/organization/shared/organization.model';
import * as fromActions from '../actions/user.actions';

export interface UserState {
  email: string | undefined;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  user_id: string;
  clientID: string;
  identities: string[];
  created_at: string;
  selectedOrganization?: Organization;
  organizations?: Organization[];
}

export const initialState: UserState = {
  email: '',
  email_verified: false,
  name: '',
  nickname: '',
  picture: '',
  sub: '',
  updated_at: '',
  user_id: '',
  clientID: '',
  identities: [],
  created_at: '',
};

export const userReducer = createReducer(
  initialState,
  
  on(fromActions.getUser, (state, { user }) => {
    return {
      ...state,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      picture: user.picture,
    }
  }),

  on(fromActions.addSelectedOrg, (state, { selectedOrganization }) => {
    return {
      ...state,
      selectedOrganization,
    }
  }),

  on(fromActions.addUserOrgs, (state, { organizations }) => {
    return {
      ...state,
      organizations,
    }
  }),
);
