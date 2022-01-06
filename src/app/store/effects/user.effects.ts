import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { OrganizationService } from '../../select-organization/services/organization.service';
import { Organization } from '../../shared/models/organization.model';
import { UserService } from '../../shared/services/user/user.service';
import * as fromActions from '../actions/user.actions';


@Injectable()
export class UserEffects {

  requestUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestUserInfo),
      tap(() => {
        this.userService.getUserInfo();
      }),
    ),
  { dispatch: false },
  );

  requestUserOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestOrganizations),
      switchMap(() => this.orgService.getOrganizations()
        .pipe(
          map(result => fromActions.requestOrganizationsSuccess({ organizations: result.data.myOrganizations as Organization[] })),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService, private orgService: OrganizationService) {}

}
