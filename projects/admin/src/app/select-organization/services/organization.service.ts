import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FindMembersGQL,
  FindMembersQuery,
  FindMyOrganizationsGQL,
  FindMyOrganizationsQuery,
} from '../../shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  constructor(private findOrganizationsService: FindMyOrganizationsGQL,
              private findMembersService: FindMembersGQL) { }

  getOrganizations(): Observable<ApolloQueryResult<FindMyOrganizationsQuery>> {
    return this.findOrganizationsService.fetch().pipe(take(1));
  }

  getMembers(): Observable<ApolloQueryResult<FindMembersQuery>> {
    return this.findMembersService.fetch().pipe(take(1));
  }
}
