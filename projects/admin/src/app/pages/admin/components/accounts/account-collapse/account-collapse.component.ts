import { Component, Input } from '@angular/core';
import { Account } from '../account';
import {
  EnableOrganizationGQL,
  DisableOrganizationGQL,
  StatusEnum,
} from '../../../../../shared/services/graphql/graphql.service';

@Component({
  selector: 'org-admin-account-collapse',
  templateUrl: './account-collapse.component.html',
  styleUrls: ['./account-collapse.component.scss'],
})
export class AccountCollapseComponent {
  @Input() accounts: Account[] = [];

  customStyle = {
    background: '#f7f7f7',
    'margin-bottom': '24px',
    border: '0px',
  };
  currentAccount: Account = {} as Account;

  constructor(
    private enableOrganization: EnableOrganizationGQL,
    private disableOrganization: DisableOrganizationGQL,
  ) {}

  enable(): void {
    if (this.currentAccount.uuid) {
      this.enableOrganization
        .mutate({
          uuid: this.currentAccount.uuid,
        })
        .subscribe(() => {
          this.currentAccount.status = StatusEnum.Pending;
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
          this.currentAccount.status = StatusEnum.Suspended;
        });
    }
  }

  setCurrent(account: Account): void {
    this.currentAccount = account;
  }
}
