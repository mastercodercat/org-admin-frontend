import { Component } from '@angular/core';
import { Domain } from './domain';

@Component({
  selector: 'org-admin-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
})
export class DomainComponent {
  domains: Domain[] = [
    {
      name: 'action.crowdskout.com',
      verified: true,
      deleted: true,
      created_at: '4/30/18 9:24 AM',
    },
    {
      name: 'george.com',
      verified: false,
      deleted: true,
      created_at: '5/3/18 10:32 AM',
    },
    {
      name: 'forms.liberal.org.au',
      verified: true,
      deleted: true,
      created_at: '1/6/19 8:12 AM',
    },
    {
      name: 'action.landman.org',
      verified: true,
      deleted: true,
      created_at: '1/6/19 8:12 AM',
    },
  ];
}
