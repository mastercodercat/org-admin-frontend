import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql  } from 'apollo-angular';

const GET_ALL_ACCOUNTS = gql`
query {
  listAccounts {
    uuid
    name
    segment
    status
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apollo: Apollo) { }

  fetchAccounts(accountIds?: string[]): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_ACCOUNTS,
    }).valueChanges.pipe(map((result) => result.data.listAccounts.map(this.transformAccountData)));
  }

  transformAccountData(accountData: any): any {
    return {
      id: accountData.uuid,
      name: accountData.name,
      segment: accountData.segment,
    };
  }
}
