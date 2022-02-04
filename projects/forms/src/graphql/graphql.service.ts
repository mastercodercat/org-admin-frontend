import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
};

export type CreateFormInput = {
  name: Scalars['String'];
  organizationUuid: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
};

export type Form = {
  __typename?: 'Form';
  uuid: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  organizationUuid: Scalars['UUID'];
  status?: Maybe<Status>;
  createdBy: Scalars['UUID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type FormConnection = {
  __typename?: 'FormConnection';
  edges: Array<FormEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type FormEdge = {
  __typename?: 'FormEdge';
  node: Form;
  cursor: Scalars['String'];
};

export type FormFilterInput = {
  createdBy?: InputMaybe<Scalars['UUID']>;
  formFolderID?: InputMaybe<Scalars['UUID']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm?: Maybe<Form>;
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};

export type OrderByInput = {
  direction?: InputMaybe<OrderType>;
  fieldName: OrderFieldName;
};

export enum OrderFieldName {
  Name = 'NAME',
  Created = 'CREATED',
  Updated = 'UPDATED'
}

export enum OrderType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  form?: Maybe<Form>;
  forms: FormConnection;
};


export type QueryFormArgs = {
  uuid: Scalars['UUID'];
};


export type QueryFormsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<FormFilterInput>;
  orderBy?: InputMaybe<OrderByInput>;
};

export enum Status {
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', forms: { __typename?: 'FormConnection', edges: Array<{ __typename?: 'FormEdge', node: { __typename?: 'Form', name?: string | null | undefined, uuid: any, organizationUuid: any, status?: Status | null | undefined, createdBy: any, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, description?: string | null | undefined, content?: string | null | undefined } }> } };

export const Document = gql`
    {
  forms(first: 2) {
    edges {
      node {
        name
        uuid
        organizationUuid
        status
        createdBy
        createdAt
        updatedAt
        description
        content
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GQL extends Apollo.Query<Query, QueryVariables> {
    document = Document;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }