import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Organization } from 'src/app/pages/organization/shared/organization.model';
import * as fromActions from 'src/app/store/actions/user.actions';
import * as fromSelectors from 'src/app/store/selectors/user.selectors';
import { AppState } from 'src/app/store/reducers';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth: AuthService, private store: Store<AppState>) { }

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
        this.store.dispatch(fromActions.getUser({ user: { ...userInfo }}));
      }
    });
  }

  /**
   * Adds the users organizations to the store
   *
   * @param {Organization[]} orgs
   * @memberof UserService
   */
  addOrganizations(orgs: Organization[]) {
    this.store.dispatch(fromActions.addUserOrgs({ organizations: orgs }));
  }

  /**
   * Adds the selected organization to the user in the store
   *
   * @param {Organization} org
   * @memberof UserService
   */
  addSelectedOrganization(org: Organization) {
    this.store.dispatch(fromActions.addSelectedOrg({selectedOrganization: org}));
  }
}
