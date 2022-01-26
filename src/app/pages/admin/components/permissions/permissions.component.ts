import { Component } from '@angular/core';
import { Permission } from './permission';

@Component({
  selector: 'org-admin-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.less'],
})
export class PermissionsComponent {
  accountPermissions: Permission[] = [
    {
      question: 'Who manages members within an account and its subaccounts?',
      role: 'Admin',
    },
    {
      question: 'Who can create subaccounts and chapters?',
      role: 'Admin',
    },
    {
      question: 'Manages the account\'s billing',
      role: 'Admin',
    },
    {
      question: 'Delegates credit to accounts and subaccounts',
      role: 'Admin',
    },
  ];

  campaignPermissions: Permission[] = [
    {
      question: 'Who can create a campaign?',
      role: 'Admin, User',
    },
    {
      question: 'Can manage the privacy for each campaign?',
      role: 'Admin, User',
    },
  ];

  emailPermissions: Permission[] = [
    {
      question: 'Who can publish an email?',
      role: 'Admin',
    },
    {
      question: 'Who can create an email draft?',
      role: 'Admin, User, Volunteer',
    },
  ];
}
