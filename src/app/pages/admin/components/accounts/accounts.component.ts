import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { FindOrganizationTreesGQL } from 'src/app/shared/services/graphql/graphql.service';
import { Account } from './account';
import * as fromUserSelectors from 'src/app/store/selectors/user.selectors';
import { AppState } from 'src/app/store/reducers';
import { Organization } from 'src/app/pages/organization/shared/organization.model';

@Component({
  selector: 'org-admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less'],
})
export class AccountsComponent implements OnInit {
  customStyle = {
    background: '#f7f7f7',
    'margin-bottom': '24px',
    border: '0px',
  };

  accounts: Account[] = [];
  isLoading = true;

  constructor(
    private findOrganizationsService: FindOrganizationTreesGQL,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.store
      .pipe(select(fromUserSelectors.selectCurrentOrganization))
      .subscribe((currentOrg) => {
        const name = currentOrg?.name || 'Helm';
        this.findOrganizationsService
          .fetch()
          .pipe(take(1))
          .subscribe((result) => {
            const orgName = (this.accounts = this.mapOrganizationData(
              result.data.organizations || []
            ).filter((org) => org.name === name));
            this.isLoading = false;
          });
      });
  }

  mapOrganizationData(organizations: any[]): Account[] {
    return (organizations || []).map((organization) => ({
      name: organization?.name || '',
      members: organization?.countUsers || 0,
      subaccounts: this.mapOrganizationData(organization?.organizations || []),
    }));
  }

  // accounts: Account[] = [
  //   {
  //     name: 'Organizational Account (Lee)',
  //     members: 456,
  //     subaccounts: [
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 244,
  //         subaccounts: [
  //           {
  //             name: 'Subaccount',
  //             members: 126,
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Organizational Account (Lee)',
  //     members: 456,
  //     subaccounts: [
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 244,
  //         subaccounts: [
  //           {
  //             name: 'Subaccount',
  //             members: 126,
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Organizational Account (Lee)',
  //     members: 456,
  //     subaccounts: [
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 244,
  //         subaccounts: [
  //           {
  //             name: 'Subaccount',
  //             members: 126,
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Organizational Account (Lee)',
  //     members: 456,
  //     subaccounts: [
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 244,
  //         subaccounts: [
  //           {
  //             name: 'Subaccount',
  //             members: 126,
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Organizational Account (Lee)',
  //     members: 456,
  //     subaccounts: [
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 244,
  //         subaccounts: [
  //           {
  //             name: 'Subaccount',
  //             members: 126,
  //           },
  //         ],
  //       },
  //       {
  //         name: 'Subaccount',
  //         members: 126,
  //       },
  //     ],
  //   },
  // ];
}
