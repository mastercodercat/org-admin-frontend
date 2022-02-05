import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

import { environment  } from '../environments/environment';

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

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
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
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
    defaultOptions,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
