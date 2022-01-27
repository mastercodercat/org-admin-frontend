import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../store/reducers';
import * as fromUserSelectors from '../store/selectors/user.selectors';
import { AuthService } from '../shared/services/auth/auth.service';
import { UserState } from '../store/reducers/user.reducer';
import { UserService } from '../shared/services/user/user.service';
import { Organization } from '../shared/models/organization.model';

@Component({
  selector: 'org-select-organization',
  templateUrl: './select-organization.component.html',
  styleUrls: ['./select-organization.component.less'],
})
export class SelectOrganizationComponent {
  userInfo$: Observable<UserState>;
  orgList$: Observable<Organization[]>;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private userService: UserService,
    private router: Router) {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
    this.orgList$ = this.store.pipe(select(fromUserSelectors.selectAllOrganizations));
  }

  /**
   * Selects the organization and saves to store
   *
   * @param {string} orgUuid
   * @memberof SelectOrganizationComponent
   */
  selectOrg(orgUuid: string): void {
    localStorage.setItem('selected_org', orgUuid);
    this.userService.addSelectedOrganizationUuid(orgUuid);
    this.router.navigate(['/home'])
      .then(() => {})
      .catch(() => {});
  }

  /**
   * Log out of accounts
   *
   * @memberof SelectOrganizationComponent
   */
  logout(): void {
    this.auth.logout();
  }

}
