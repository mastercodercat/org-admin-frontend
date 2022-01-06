import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as fromUserActions from '../actions/user.actions';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => [
        fromUserActions.requestUserInfo(),
        fromUserActions.requestOrganizations(),
        fromUserActions.addSelectedOrgUuid({ selectedOrganizationUuid: localStorage.getItem('selected_org') || '' }),
      ]),
    ),
  );

  constructor(private actions$: Actions) {}

}
