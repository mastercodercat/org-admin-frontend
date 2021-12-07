import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member, OrganizationUsers } from 'src/app/pages/admin/components/members/member';
import { FindMembersGQL, 
  FindMembersQuery, 
  FindOrganizationsGQL, 
  FindOrganizationsQuery, 
  Maybe, 
  OrganizationUserType, 
  UserEdge } from 'src/app/shared/services/graphql/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private findOrganizationsService: FindOrganizationsGQL, 
    private findMembersService: FindMembersGQL) { }

  getOrganizations(): Observable<ApolloQueryResult<FindOrganizationsQuery>> {
    return this.findOrganizationsService.fetch().pipe(take(1));
  }

  getUsers(): Observable<ApolloQueryResult<FindMembersQuery>> {
    return this.findMembersService.fetch().pipe(take(1));
  }

  mapUsersToMembers(users: UserEdge[]): Member[] {
    let members: Member[] = [];

    if (!users) return members;
    if (users.length == 0) return members;

    const currentOrgId = localStorage.getItem('selected_org');

    users.map(user => {
      const u = user.node;
      const currentOrg = u?.organizationUsers?.find( 
        (orgUser:Maybe<OrganizationUserType>) => orgUser?.organization?.uuid === currentOrgId
      );

      members.push({
        uuid: u?.uuid ?? '',
        name: `${u?.firstName} ${u?.lastName}`,
        firstName: u?.firstName ?? '',
        lastName: u?.lastName ?? '',
        email: u?.email ?? '',
        phone: u?.phone || '', 
        position: currentOrg?.title || '',
        organizationUsers: u?.organizationUsers?.map( (orgUser:Maybe<OrganizationUserType>) => 
            ({
              organization: {
                uuid: orgUser?.organization?.uuid ?? '',
                name: orgUser?.organization?.name ?? ''
              }, 
              role: {
                uuid: orgUser?.role?.uuid ?? '',
                name: orgUser?.role?.name ?? ''
              }
            })
          ) ?? [{
                 organization: {uuid:'', name:''}, 
                 role: {uuid:'', name:''}
               }]
      })
    })

    return members;
  }
}
