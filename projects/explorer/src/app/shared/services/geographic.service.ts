import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_ALL = gql`
  query {
    segment {
      id
      name
      segments {
          counties {
              id
              name
          }
      }
    }
  }
`;

/**
  postcodes {
      id
      name
  }
  congressional {
      id
      name
  }
 */

@Injectable({
  providedIn: 'root'
})
export class GeographicService {

  constructor(private apollo: Apollo) { }

  fetchAll(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL,
    }).valueChanges.pipe(map((result) => result?.data?.segment));
  }
}
