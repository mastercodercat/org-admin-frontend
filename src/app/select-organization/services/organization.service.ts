import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member, OrganizationUsers } from '../../pages/admin/components/members/member';
import { User } from '../../shared/models/user.model';
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

  getUsers(): Observable<ApolloQueryResult<FindMembersQuery>> {
    return this.findMembersService.fetch().pipe(take(1));
  }

  mapUsersToMembers(users: User[]): Member[] {
    const members: Member[] = [];

    if (!users) {return members;}
    if (users.length === 0) {
      return members;
    }

    const currentOrgId = localStorage.getItem('selected_org');

    users.map(user => {
      const u = user; // user.node;
      const currentOrg = u?.organizationUsers?.find(
        (orgUser: OrganizationUsers) => orgUser?.organization?.uuid === currentOrgId,
      );
      let organizationUsers = [];
      if (u?.organizationUsers) {
        organizationUsers = u?.organizationUsers?.map( (orgUser: OrganizationUsers) =>
          ({
            organization: {
              uuid: orgUser?.organization?.uuid ?? '',
              name: orgUser?.organization?.name ?? '',
            },
            role: {
              uuid: orgUser?.role?.uuid ?? '',
              name: orgUser?.role?.name ?? '',
            },
          }),
        ) ?? [{
          organization: {uuid:'', name:''},
          role: {uuid:'', name:''},
        }];
      }

      members.push({
        uuid: u?.uuid ?? '',
        name: `${u?.firstName} ${u?.lastName}`,
        firstName: u?.firstName ?? '',
        lastName: u?.lastName ?? '',
        email: u?.email ?? '',
        phone: u?.phone || '',
        position: currentOrg?.title || '',
        organizationUsers,
      });
    });

    return members;
  }
}
