import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { AllFormsGQL, AllFormsQuery } from '../../../graphql/graphql.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private allFormsGQL: AllFormsGQL) {  }

  loadForms(): Observable<ApolloQueryResult<AllFormsQuery>> {
    const variables = {
      organizationUuid: '123e4567-e89b-12d3-a456-426614174004'
    }
    return this.allFormsGQL.fetch(variables);
  }
}
