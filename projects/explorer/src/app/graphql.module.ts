import {NgModule} from '@angular/core';
import {APOLLO_NAMED_OPTIONS, NamedOptions} from 'apollo-angular';
import {ApolloClientOptions, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

import { environment  } from '../environments/environment';
import {HttpHeaders} from "@angular/common/http";

let uriHost = '';
if (environment.apiURL === '{PLACEHOLDER}') {
  switch (window.location.hostname) {
    case 'login.civicexplorer.com':
      uriHost = 'https://production.explorer.organizer.helmahead.com';
    break;
    case 'staging-www.civicexplorer.com':
      uriHost  = 'https://staging.explorer.organizer.helmahead.com';
    break;
    case 'sandbox-www.civicexplorer.com':
      uriHost = 'https://sandbox.explorer.organizer.helmahead.com';
    break;
  }
} else {
  uriHost = environment.apiURL;
}

const uri = uriHost // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): NamedOptions {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };
  return {
    explorer: {
      link: httpLink.create({
        uri,
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          organizationUuid: `${localStorage.getItem('selected_org')}`,
          Origin: window.location.origin
        })
      }),
      cache: new InMemoryCache(),
      defaultOptions,
    }
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
