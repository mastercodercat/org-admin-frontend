import { createAction, props } from '@ngrx/store';
import { Member } from '../../components/members/member.model';

export const loadMembers = createAction(
  '[Members] Load Members',
);

export const loadMembersSuccess = createAction(
  '[Members] Load Members Success',
  props<{ members: Member[] }>(),
);

export const loadMembersFailure = createAction(
  '[Members] Load Members Failure',
  props<{ error: string }>(),
);
