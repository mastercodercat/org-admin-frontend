import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMembers from '../reducers/members.reducer';

export const selectMembersState = createFeatureSelector<fromMembers.MembersState>(
  fromMembers.membersFeatureKey,
);

export const selectMembers = createSelector(selectMembersState, (members: fromMembers.MembersState) => members.members);
export const selectIsLoading = createSelector(selectMembersState, (members: fromMembers.MembersState) => members.isLoading);
