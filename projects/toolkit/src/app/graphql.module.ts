import {NgModule} from '@angular/core';
import {APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, NamedOptions} from 'apollo-angular';
import {ApolloClientOptions, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

import { environment  } from '../environments/environment';
import {HttpHeaders} from '@angular/common/http';

export function createApollo(httpLink: HttpLink): NamedOptions {
  return {
    toolkit: {
      link: httpLink.create({
        uri: 'https://sandbox.federation-service.organizer.helmahead.com/',
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          organizationUuid: `${localStorage.getItem('selected_org')}`,
          Origin: window.location.origin,
        }),
      }),
      cache: new InMemoryCache(),
    },
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
