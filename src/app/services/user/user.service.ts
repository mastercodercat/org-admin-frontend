import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromActions from '../../store/actions/user.actions';
import * as fromSelectors from '../../store/selectors/user.selectors';
import { AuthService } from '../../../../projects/admin/src/app/shared/services/auth/auth.service';
import { UserState } from '../../store/reducers/user.reducer';
import { User } from '../../../../projects/admin/src/app/shared/models/user.model';
import { Maybe, ValidatePasswordResetTokenGQL } from '../../../../projects/admin/src/app/shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    public auth: AuthService,
    private store: Store<UserState>,
    private validatePasswordResetTokenService: ValidatePasswordResetTokenGQL,
  ) { }

  /**
   * Get user info from Auth0
   *
   * @memberof UserService
   */
  getUserInfo(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    // Call auth0 using the access token to grab the user info and save to the store
    this.auth.auth0.client.userInfo(accessToken, (err, userInfo) => {
      if (userInfo) {
        const user: User = {
          name: userInfo.name,
          nickname: userInfo.nickname,
          email: userInfo.email || '',
          picture: userInfo.picture,
        };
        this.store.dispatch(fromActions.addUserInfo({ user: { ...user }}));
      }
    });
  }

  /**
   * Adds the selected organization uuid to the user in the store
   *
   * @param {string} orgUuid Organization uuid
   * @memberof UserService
   */
  addSelectedOrganizationUuid(orgUuid: string): void {
    this.store.dispatch(fromActions.addSelectedOrgUuid({ selectedOrganizationUuid: orgUuid }));
  }

  /**
   * A selector that returns if the user is a Helm admin
   *
   * @returns {Observable<boolean>}
   * @memberof UserService
   */
  isHelmAdmin$(): Observable<boolean> {
    return this.store.pipe(select(fromSelectors.selectIsHelmAdmin));
  }

  /**
   * Query password reset token validation
   *
   * @param {string} token
   * @returns {(Observable<Maybe<boolean> | undefined>)}
   * @memberof UserService
   */
  isPasswordResetTokenValid(token: string): Observable<Maybe<boolean> | undefined> {
    return this.validatePasswordResetTokenService.fetch({ token })
      .pipe(
        map(res => res?.data?.validatePasswordResetToken),
      );
  }
}
