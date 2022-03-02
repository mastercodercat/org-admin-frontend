import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { StatusEnum, GetDomainQuery, VerifyOrganizationHostnameMutation } from '../../../../../shared/services/graphql/graphql.service';
import { Domain } from '../domain.model';
import { DomainsService } from '../../../services/domains.service';

@Component({
  selector: 'org-admin-domain-view',
  templateUrl: './domain-view.component.html',
  styleUrls: ['./domain-view.component.scss'],
})
export class DomainViewComponent implements OnInit {
  domain: Domain | undefined;

  get isDomainUnverified() {
    return this.domain?.status === StatusEnum.Unverified
  }

  constructor(private route: ActivatedRoute, private domainService: DomainsService) { }

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('id') || '';
    if (uuid) {
      this.domainService
        .getDomain(uuid)
        .subscribe((result: ApolloQueryResult<GetDomainQuery>) => {
          if (result.data?.organizationHostname) {
            this.domain = result.data.organizationHostname as Domain;
          }
        });
    }
  }

  verify(): void {
    if (this.domain) {
      this.domainService.verifyDomain(this.domain.uuid)
        .subscribe((result: FetchResult<VerifyOrganizationHostnameMutation>) => {
          if (result?.errors && result?.errors.length > 0) {
            console.log(result?.errors);
          }
        });
    }
  }
}
