import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDomainGQL } from 'projects/admin/src/app/shared/services/graphql/graphql.service';
import { Domain } from '../domain.model';

@Component({
  selector: 'org-admin-domain-view',
  templateUrl: './domain-view.component.html',
  styleUrls: ['./domain-view.component.scss'],
})
export class DomainViewComponent implements OnInit {
  domain = {
    name: 'action.crowdskout.com',
    verified: true,
    deleted: true,
    created_at: '4/30/18 9:24 AM',
    verification_code: 'FQfKpiKv79wkcBEqiQRoARiYxBnS2uJzHEd52NHB',
  };

  constructor(private route: ActivatedRoute,
    private getDomainService: GetDomainGQL) { }

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('id') || '';
    if (uuid) {
      this.getDomainService.fetch({ uuid }).subscribe(result => {
        console.log(result.data.organizationHostname);
      })
    }
  }
}
