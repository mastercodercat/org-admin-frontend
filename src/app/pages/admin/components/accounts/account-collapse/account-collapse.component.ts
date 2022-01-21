import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import {
  EnableOrganizationGQL,
  DisableOrganizationGQL,
} from 'src/app/shared/services/graphql/graphql.service';

@Component({
  selector: 'org-admin-account-collapse',
  templateUrl: './account-collapse.component.html',
  styleUrls: ['./account-collapse.component.less'],
})
export class AccountCollapseComponent implements OnInit {
  customStyle = {
    background: '#f7f7f7',
    'margin-bottom': '24px',
    border: '0px',
  };
  currentAccount: Account = {} as Account;

  @Input() accounts: Account[] = [];

  constructor(
    private enableOrganization: EnableOrganizationGQL,
    private disableOrganization: DisableOrganizationGQL
  ) {}

  ngOnInit() {}

  enable(): void {
    if (this.currentAccount.uuid) {
      this.enableOrganization
        .mutate({
          uuid: this.currentAccount.uuid,
        })
        .subscribe(() => {
          this.currentAccount.status = 'PENDING';
        });
    }
  }

  disable(): void {
    if (this.currentAccount.uuid) {
      this.disableOrganization
        .mutate({
          uuid: this.currentAccount.uuid,
        })
        .subscribe(() => {
          this.currentAccount.status = 'SUSPENDED';
        });
    }
  }

  setCurrent(account: Account): void {
    this.currentAccount = account;
  }
}
