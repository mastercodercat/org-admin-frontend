import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql  } from 'apollo-angular';

declare global {
  interface Window { 
    Intercom: any; 
    intercomSettings: any;
  }
}

const GET_HASH = gql`
query GetHash($email: String!){
  getIntercomHash(email: $email)
}
`;

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
  constructor(private apollo: Apollo) { }

  boot(): void {
    const intercomSettings = {
      app_id: 'dxv5uqrw',
    }
    window.Intercom('boot', intercomSettings);
  }

  updateForUser(user: any, intercomHash: string): void {
    window.intercomSettings = {
      app_id: 'dxv5uqrw',
      email: user.email,
      name: user.nickname,
      user_hash: intercomHash,
    }
    window.Intercom('update');
  }

  updateForVisitor(): void {
    window.intercomSettings = {
      app_id: 'dxv5uqrw',
    }
    window.Intercom('update');
  }

  shutdown(): void {
    window.Intercom('shutdown');
  }

  fetchHash(email: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_HASH,
      variables: {
        email: email,
      }
    }).valueChanges.pipe(map((result) => result.data.getIntercomHash));
  }
}
