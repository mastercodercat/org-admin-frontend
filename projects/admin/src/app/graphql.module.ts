import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri: 'https://sandbox-api.civicexplorer.com/graphql', // TODO: temporary until federation works
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        organizationUuid: `${localStorage.getItem('selected_org')}`,
        Origin: window.location.origin
      }),
    }),
    cache: new InMemoryCache(),
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
