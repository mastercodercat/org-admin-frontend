import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromUserSelectors from '../../../../store/selectors/user.selectors';
import { FindOrganizationTreesGQL } from '../../../../shared/services/graphql/graphql.service';
import { UserService } from '../../../../shared/services/user/user.service';
import { Account } from './account';
import { UserState } from '../../../../store/reducers/user.reducer';
import { Organization } from '../../../../shared/models/organization.model';
@Component({
  selector: 'org-admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less'],
})
export class AccountsComponent implements OnInit {
  isHelmAdmin$: Observable<boolean>;
  accounts: Account[] = [];
  isLoading = true;

  constructor(
    private findOrganizationsService: FindOrganizationTreesGQL,
    private userService: UserService,
    private store: Store<UserState>) {
    this.isHelmAdmin$ = this.userService.isHelmAdmin$();
  }

  ngOnInit(): void {
    this.isLoading = true;

    combineLatest([
      this.store.pipe(select(fromUserSelectors.selectCurrentOrganizationUuid)),
      this.findOrganizationsService.fetch().pipe(take(1)),
    ]).subscribe(([uuid, result]) => {
      this.accounts = this.mapOrganizationData(result.data.organizations as Organization[] || []).filter(org => org.uuid === uuid);
      this.isLoading = false;
    });
  }

  mapOrganizationData(organizations: Organization[]): Account[] {
    return (organizations || []).map(organization => ({
      name: organization?.name || '',
      uuid: organization?.uuid || '',
      members: organization?.countUsers || 0,
      subaccounts: this.mapOrganizationData(organization?.organizations || []),
    }));
  }
}
