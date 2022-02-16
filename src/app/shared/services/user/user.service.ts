import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromActions from '../../../store/actions/user.actions';
import * as fromSelectors from '../../../store/selectors/user.selectors';
import { AuthService } from '../../../../../projects/admin/src/app/shared/services/auth/auth.service';
import { UserState } from '../../../store/reducers/user.reducer';
import { Maybe, ValidatePasswordResetTokenGQL } from '../../../../../projects/admin/src/app/shared/services/graphql/graphql.service';

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
   * Request user information
   *
   * @memberof UserService
   */
  getUserInfo(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch user info');
    }

    // Decode jwt token to get the users uuid
    const helper = new JwtHelperService();
    const userInfo = helper.decodeToken(accessToken);
    const uuid = userInfo['http://helmteam.us/app_metadata'].uuid as string;
    // Set to localstorage
    localStorage.setItem('user_uuid', uuid);
    // Dispatch action to request current user information
    this.store.dispatch(fromActions.requestUserInfo({ uuid }));
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
   * A selector that returns if the user is an admin role
   *
   * @return {Observable<boolean>}
   * @memberof UserService
   */
  isAdmin$(): Observable<boolean> {
    return this.store.pipe(select(fromSelectors.selectIsAdmin));
  }

  /**
   * A selector that returns if the user is an admin or user role
   *
   * @return {Observable<boolean>}
   * @memberof UserService
   */
  isAdminOrUser$(): Observable<boolean> {
    return this.store.pipe(select(fromSelectors.selectIsAdminOrUser));
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
