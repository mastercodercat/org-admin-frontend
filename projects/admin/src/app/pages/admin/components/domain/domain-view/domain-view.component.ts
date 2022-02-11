import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain } from '../domain';

@Component({
  selector: 'org-admin-domain-view',
  templateUrl: './domain-view.component.html',
  styleUrls: ['./domain-view.component.scss'],
})
export class DomainViewComponent implements OnInit {
  domain: Domain = {
    name: 'action.crowdskout.com',
    verified: true,
    deleted: true,
    created_at: '4/30/18 9:24 AM',
    verification_code: 'FQfKpiKv79wkcBEqiQRoARiYxBnS2uJzHEd52NHB',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('id') || '';
  }
}
