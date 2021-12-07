import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FindOrganizationTreesGQL } from 'src/app/shared/services/graphql/graphql.service';
import { Account } from './account';

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

  constructor(private findOrganizationsService: FindOrganizationTreesGQL) {}

  ngOnInit() {
    this.isLoading = true;
    this.findOrganizationsService.fetch().pipe(take(1)).subscribe(result => {
      this.accounts = this.mapOrganizationData(result.data.organizations || []);
      this.isLoading = false;
    });
  };

  mapOrganizationData(organizations: any[]): Account[] {
    return (organizations || []).map(organization => ({
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
