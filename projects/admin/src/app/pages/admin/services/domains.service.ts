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
  VerifyOrganizationHostnameGQL,
  VerifyOrganizationHostnameMutation,
} from '../../../shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {

  constructor(private getDomains: GetDomainsGQL,
              private createDomainGQL: CreateDomainGQL,
              private getDomainGQL: GetDomainGQL,
              private deleteDomainGQL: DeleteOrganizationHostnameGQL,
              private verifyDomainGQL: VerifyOrganizationHostnameGQL) {
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

  verifyDomain(hostnameUuid: string): Observable<FetchResult<VerifyOrganizationHostnameMutation>> {
    return this.verifyDomainGQL.mutate({
      input: {
        hostnameUuid,
      },
    });
  }
}
