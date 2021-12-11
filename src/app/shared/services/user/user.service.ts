import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from '../../../store/actions/user.actions';
import * as fromSelectors from '../../../store/selectors/user.selectors';
import { AuthService } from '../auth/auth.service';
import { UserState } from '../../../store/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth: AuthService, private store: Store<UserState>) { }

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
        this.store.dispatch(fromActions.addUserInfo({ user: { ...userInfo }}));
      }
    });
  }

  /**
   * Adds the selected organization uuid to the user in the store
   *
   * @param {string} orgUuid Organization uuid
   * @memberof UserService
   */
  addSelectedOrganizationUuid(orgUuid: string) {
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
}
