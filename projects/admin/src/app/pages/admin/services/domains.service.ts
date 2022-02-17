import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { DomainTypeEnum,
  GetDomainsGQL,
  GetDomainsQuery,
  GetDomainGQL,
  GetDomainQuery,
  CreateDomainGQL,
  CreateDomainMutation,
  DeleteOrganizationHostnameGQL,
  DeleteOrganizationHostnameMutation,
} from '../../../shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {

  constructor(private getDomains: GetDomainsGQL,
              private createDomainGQL: CreateDomainGQL,
              private getDomainGQL: GetDomainGQL,
              private deleteDomainGQL: DeleteOrganizationHostnameGQL) {
  }

  loadLandingPageDomains(): Observable<ApolloQueryResult<GetDomainsQuery>> {
    return this.getDomains.fetch({ domainType: DomainTypeEnum.LandingPage });
  }

  createDomain(hostname: string): Observable<FetchResult<CreateDomainMutation>> {
    return this.createDomainGQL.mutate({
      input: {
        hostname,
        domainType: DomainTypeEnum.LandingPage,
      },
    });
  }

  getDomain(uuid: string): Observable<ApolloQueryResult<GetDomainQuery>> {
    return this.getDomainGQL.fetch({ uuid });
  }

  deleteDomain(uuid: string): Observable<FetchResult<DeleteOrganizationHostnameMutation>> {
    return this.deleteDomainGQL.mutate({
      input: {
        uuid,
      },
    });
  }
}
