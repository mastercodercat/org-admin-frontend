import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { AllFormsGQL, AllFormsQuery, CreateFormGQL, CreateFormInput, CreateFormMutation } from '../../../graphql/graphql.service';
import { Form } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(
    private allFormsGQL: AllFormsGQL,
    private createFormGQL: CreateFormGQL,
  ) {  }

  loadForms(): Observable<ApolloQueryResult<AllFormsQuery>> {
    const variables = {
      organizationUuid: '123e4567-e89b-12d3-a456-426614174004',
    };
    this.allFormsGQL.client = 'toolkit';
    return this.allFormsGQL.fetch(variables);
  }

  createForms(form: Form): Observable<FetchResult<CreateFormMutation>> {
    this.createFormGQL.client = 'toolkit';

    const input = {
      ...form,
      createdBy: 'ab9e902b-949e-4a7d-949c-f73722862e29',
      organizationUuid: '123e4567-e89b-12d3-a456-426614174004',
    };
    return this.createFormGQL.mutate({ input });
  }
}
