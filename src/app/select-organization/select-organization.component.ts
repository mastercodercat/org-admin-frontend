import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/reducers';
import * as fromUserSelectors from '../store/selectors/user.selectors';
import { AuthService } from '../shared/services/auth/auth.service';
import { OrganizationService } from './services/organization.service';
import { UserState } from '../store/reducers/user.reducer';
import { Organization } from '../pages/organization/shared/organization.model';
import { UserService } from '../shared/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'org-select-organization',
  templateUrl: './select-organization.component.html',
  styleUrls: ['./select-organization.component.less']
})
export class SelectOrganizationComponent implements OnInit {
  userInfo$!: Observable<UserState>;
  orgList: any;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private orgService: OrganizationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
    this.orgService.getOrganizations().subscribe(result => {
      this.orgList = result.data.organizations;
    });
  }

  /**
   * Selects the organization and saves to store
   *
   * @param {Organization} org
   * @memberof SelectOrganizationComponent
   */
  selectOrg(org: Organization) {
    this.userService.addSelectedOrganization(org);
    localStorage.setItem('selected_org', org.uuid);
    this.router.navigate(['/home']);
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
