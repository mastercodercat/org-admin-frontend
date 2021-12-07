import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';

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

  @Input() accounts: Account[] = [];

  constructor() {}

  ngOnInit() {}
}
