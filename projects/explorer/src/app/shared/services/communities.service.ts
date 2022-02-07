import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_ALL = gql`
  query ListCommunities($accountId: ID!){
    listCommunities(accountId: $accountId) {
      uuid
      name
      description
      notes
      selections
      criteriaFilters
      geoFilters
    }
  }
`;

const CREATE = gql`
  mutation CreateCommunity($input: CommunityInput!){
    createCommunity(input: $input) {
      name
      description
      notes
      status
    }
  }
`;

const UPDATE = gql`
  mutation UpdateCommunity($input: CommunityInput!){
    updateCommunity(input: $input) {
      name
      description
      notes
      status
    }
  }
`;

const DELETE_COMMUNITY = gql`
  mutation DeleteCommunity($input: CommunityInput!) {
    deleteCommunity(input: $input)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  constructor(private apollo: Apollo) { }

  getCurrentAccount(): string {
    return localStorage.getItem('explorer_account') || '';
  }

  getCommunities(): Observable<any> {
    const accountId = this.getCurrentAccount();
    return this.apollo.use('explorer').watchQuery<any>({
      query: GET_ALL,
      variables: {
        accountId
      }
    }).valueChanges.pipe(map((result) => result.data.listCommunities.map(this.transformCommunity)));
  }

  create(communityInput: any): Observable<any> {
    const accountId = this.getCurrentAccount();
    return this.apollo.use('explorer').mutate({
      mutation: CREATE,
      variables: {
        input: {
          accountId,
          ...communityInput
        }
      }
    }).pipe(map((result: any) => result.data.createCommunity));
  }

  update(communityInput: any): Observable<any> {
    const accountId = this.getCurrentAccount();
    return this.apollo.use('explorer').mutate({
      mutation: UPDATE,
      variables: {
        input: {
          accountId,
          ...communityInput
        }
      }
    }).pipe(map((result: any) => result.data.updateCommunity));
  }

  deleteCommunity(uuid: string) {
    return this.apollo.use('explorer').mutate<any>({
      mutation: DELETE_COMMUNITY,
      variables: {
        input: {
          uuid: uuid,
        }
      }}).pipe(map((result: any) => result.data.deleteCommunity));
  }

  transformCommunity(community: any): any {
    if (typeof community.selections === 'string'){
      community.selections = JSON.parse(community.selections);
    }
    if (typeof community.criteriaFilters === 'string'){
      community.criteriaFilters = JSON.parse(community.criteriaFilters);
    }
    if (typeof community.geoFilters === 'string'){
      community.geoFilters = JSON.parse(community.geoFilters);
    }
    return community;
  }

}
