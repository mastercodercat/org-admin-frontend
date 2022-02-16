import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrganizationService } from '../../../../projects/admin/src/app/select-organization/services/organization.service';
import { FindUserGQL } from '../../../../projects/admin/src/app/shared/services/graphql/graphql.service';
import { OrganizationUser } from '../../shared/models/organization-user.model';
import { Organization } from '../../shared/models/organization.model';
import { User } from '../../shared/models/user.model';
import * as fromActions from '../actions/user.actions';


@Injectable()
export class UserEffects {

  requestUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestUserInfo),
      switchMap(({uuid}) => this.findUser.fetch({ uuid })
        .pipe(
          map(result => fromActions.requestUserInfoSuccess({
            user: result.data.user as User,
            orgUsers: result.data.user?.organizationUsers as OrganizationUser[],
          })),
          catchError(err => of(fromActions.requestUserInfoFailure({ err }))),
        ),
      ),
    ),
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

  constructor(private actions$: Actions, private orgService: OrganizationService, private findUser: FindUserGQL) {}

}
