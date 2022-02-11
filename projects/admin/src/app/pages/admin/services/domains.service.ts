import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { DomainTypeEnum, GetDomainsGQL, GetDomainsQuery } from '../../../shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {

  constructor(private getDomains: GetDomainsGQL) {
  }

  loadLandingPageDomains(): Observable<ApolloQueryResult<GetDomainsQuery>> {
    return this.getDomains.fetch({ domainType: DomainTypeEnum.LandingPage });
  }
}
