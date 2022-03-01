import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  JSON: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
};








export type CreateFormInput = {
  name: Scalars['String'];
  organizationUuid: Scalars['UUID'];
  createdBy: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  content: Scalars['JSON'];
  cssClasses?: Maybe<Array<Maybe<Scalars['String']>>>;
  confirmation: Scalars['JSON'];
};

export type CreateFormPayload = {
  __typename?: 'CreateFormPayload';
  form: Form;
};


export type DeleteFormInput = {
  uuid: Scalars['UUID'];
};

export type DeleteFormPayload = {
  __typename?: 'DeleteFormPayload';
  uuid: Scalars['UUID'];
};

export type Form = {
  __typename?: 'Form';
  uuid: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  organizationUuid: Scalars['UUID'];
  status?: Maybe<FormStatus>;
  createdBy: Scalars['UUID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  content: Scalars['JSON'];
  cssClasses?: Maybe<Array<Maybe<Scalars['String']>>>;
  confirmation: Scalars['JSON'];
};

export enum FormStatus {
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}


export type Mutation = {
  __typename?: 'Mutation';
  createForm: CreateFormPayload;
  deleteForm: DeleteFormPayload;
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};


export type MutationDeleteFormArgs = {
  input: DeleteFormInput;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  form?: Maybe<Form>;
  forms: Array<Form>;
};


export type QueryFormArgs = {
  uuid: Scalars['UUID'];
};


export type QueryFormsArgs = {
  organizationUuid: Scalars['UUID'];
};


export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type AllFormsQueryVariables = Exact<{
  organizationUuid: Scalars['UUID'];
}>;


export type AllFormsQuery = (
  { __typename?: 'Query' }
  & { forms: Array<(
    { __typename?: 'Form' }
    & Pick<Form, 'uuid' | 'name' | 'status' | 'createdBy' | 'createdAt'>
  )> }
);

export type CreateFormMutationVariables = Exact<{
  input: CreateFormInput;
}>;


export type CreateFormMutation = (
  { __typename?: 'Mutation' }
  & { createForm: (
    { __typename?: 'CreateFormPayload' }
    & { form: (
      { __typename?: 'Form' }
      & Pick<Form, 'uuid' | 'name' | 'status' | 'createdBy' | 'createdAt'>
    ) }
  ) }
);

export const AllFormsDocument = gql`
    query allForms($organizationUuid: UUID!) {
  forms(organizationUuid: $organizationUuid) {
    uuid
    name
    status
    createdBy
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllFormsGQL extends Apollo.Query<AllFormsQuery, AllFormsQueryVariables> {
    document = AllFormsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateFormDocument = gql`
    mutation CreateForm($input: CreateFormInput!) {
  createForm(input: $input) {
    form {
      uuid
      name
      status
      createdBy
      createdAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFormGQL extends Apollo.Mutation<CreateFormMutation, CreateFormMutationVariables> {
    document = CreateFormDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
