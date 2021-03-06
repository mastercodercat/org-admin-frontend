import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../src/app/store/reducers';
import * as fromUserSelectors from '../../../../../src/app/store/selectors/user.selectors';
import { AuthService } from '../shared/services/auth/auth.service';
import { UserState } from '../../../../../src/app/store/reducers/user.reducer';
import { UserService } from '../../../../../src/app/shared/services/user/user.service';
import { Organization } from '../../../../../src/app/shared/models/organization.model';

@Component({
  selector: 'org-select-organization',
  templateUrl: './select-organization.component.html',
  styleUrls: ['./select-organization.component.scss'],
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
    this.orgList$ = this.store.pipe(select(fromUserSelectors.selectActivePendingOrganizations));
  }

  /**
   * Selects the organization and saves to store
   *
   * @param {string} orgUuid
   * @memberof SelectOrganizationComponent
   */
  async selectOrg(orgUuid: string): Promise<void> {
    localStorage.setItem('selected_org', orgUuid);
    this.userService.addSelectedOrganizationUuid(orgUuid);
    await this.router.navigate(['/home']);
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
