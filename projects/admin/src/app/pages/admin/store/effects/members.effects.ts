import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrganizationService } from '../../../../select-organization/services/organization.service';
import { Member } from '../../components/members/member.model';
import * as fromActions from '../actions/members.actions';


@Injectable()
export class MembersEffects {

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadMembers),
      switchMap(() => this.orgService.getMembers()
        .pipe(
          map(result => fromActions.loadMembersSuccess({ members: result.data.users as Member[] })),
          catchError(err => of(fromActions.loadMembersFailure({ error: err }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private orgService: OrganizationService) {}
}
