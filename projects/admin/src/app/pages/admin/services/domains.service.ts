import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { DomainTypeEnum,
  GetDomainsGQL,
  GetDomainsQuery,
  DeleteOrganizationHostnameGQL,
  DeleteOrganizationHostnameMutation,
} from '../../../shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {

  constructor(private getDomains: GetDomainsGQL, private deleteDomainGQL: DeleteOrganizationHostnameGQL) {
  }

  loadLandingPageDomains(): Observable<ApolloQueryResult<GetDomainsQuery>> {
    return this.getDomains.fetch({ domainType: DomainTypeEnum.LandingPage });
  }

  deleteDomain(uuid: string): Observable<FetchResult<DeleteOrganizationHostnameMutation>> {
    return this.deleteDomainGQL.mutate({
      input: {
        uuid,
      },
    });
  }
}
