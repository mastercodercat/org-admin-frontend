import { createReducer, on } from '@ngrx/store';
import { Member } from '../../components/members/member.model';
import * as fromActions from '../actions/members.actions';


export const membersFeatureKey = 'members';

export interface MembersState {
  members: Member[];
  isLoading: boolean;
  success: boolean;
  failure: boolean;
  error: string;
}

export const initialState: MembersState = {
  members: [],
  isLoading: false,
  success: false,
  failure: false,
  error: '',
};

export const membersReducer = createReducer(
  initialState,

  on(fromActions.loadMembers, state => ({
    ...state,
    isLoading: true,
  })),

  on(fromActions.loadMembersSuccess, (state, { members }) => ({
    ...state,
    isLoading: false,
    success: true,
    failure: false,
    members: [...members],
  })),

  on(fromActions.loadMembersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    failure: true,
    success: false,
    error,
  })),
);
