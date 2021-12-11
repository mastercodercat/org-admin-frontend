import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FindOrganizationTreesGQL } from '../../../../shared/services/graphql/graphql.service';
import { UserService } from '../../../../shared/services/user/user.service';
import { Account } from './account';
@Component({
  selector: 'org-admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less'],
})
export class AccountsComponent implements OnInit {
  isHelmAdmin$: Observable<boolean>;
  accounts: Account[] = [];
  isLoading = true;

  constructor(private findOrganizationsService: FindOrganizationTreesGQL, private userService: UserService) { 
    this.isHelmAdmin$ = this.userService.isHelmAdmin$();
  }

  ngOnInit() {
    this.isLoading = true;
    this.findOrganizationsService
      .fetch()
      .pipe(take(1))
      .subscribe((result) => {
        this.accounts = this.mapOrganizationData(
          result.data.organizations || []
        ).filter((org) => org.uuid === localStorage.getItem('selected_org'));
        this.isLoading = false;
      });
  }

  mapOrganizationData(organizations: any[]): Account[] {
    return (organizations || []).map((organization) => ({
      name: organization?.name || '',
      uuid: organization?.uuid || '',
      members: organization?.countUsers || 0,
      subaccounts: this.mapOrganizationData(organization?.organizations || []),
    }));
  }
}
