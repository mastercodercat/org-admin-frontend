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
};



export type AcceptOrganizationUserInput = {
  token: Scalars['String'];
  user?: Maybe<AcceptOrganizationUserInputUser>;
};

export type AcceptOrganizationUserInputUser = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type AssignRolePermissionInputType = {
  roleUuid: Scalars['String'];
  permissionUuid: Scalars['String'];
  ability: Scalars['String'];
};

export type AssignRolePermissionPayloadType = {
  __typename?: 'AssignRolePermissionPayloadType';
  rolePermission?: Maybe<RolePermissionType>;
};

export type AssignUserPermissionInputType = {
  organizationUserId: Scalars['String'];
  permissionId: Scalars['String'];
  ability: Scalars['String'];
};

export type AssignUserPermissionPayloadType = {
  __typename?: 'AssignUserPermissionPayloadType';
  userPermission?: Maybe<UserPermissionType>;
};

export type BlockUserInput = {
  uuid: Scalars['ID'];
};

export type BlockUserPayloadType = {
  __typename?: 'BlockUserPayloadType';
  user?: Maybe<UserType>;
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
  organizationUuid?: Maybe<Scalars['ID']>;
  adminEmail: Scalars['String'];
  subscriptionType: SubscriptionEnumType;
  organizationType: OrganizationEnumType;
};

export type CreateOrganizationPayloadType = {
  __typename?: 'CreateOrganizationPayloadType';
  organization?: Maybe<OrganizationType>;
};

export type CreateRoleInputType = {
  organizationId: Scalars['String'];
  roleName: Scalars['String'];
  roleDescription?: Maybe<Scalars['String']>;
};

export type CreateRolePayloadType = {
  __typename?: 'CreateRolePayloadType';
  role?: Maybe<RoleType>;
};

export type DeleteUserInput = {
  uuid: Scalars['ID'];
};

export type DeleteUserPayloadType = {
  __typename?: 'DeleteUserPayloadType';
  user?: Maybe<UserType>;
};

export type DisableOrganizationInput = {
  uuid: Scalars['ID'];
};

export type DisableOrganizationPayloadType = {
  __typename?: 'DisableOrganizationPayloadType';
  organization?: Maybe<OrganizationType>;
};

export type DisableUserInput = {
  uuid: Scalars['ID'];
};

export type DisableUserPayloadType = {
  __typename?: 'DisableUserPayloadType';
  user?: Maybe<UserType>;
};

export type EnableOrganizationInput = {
  uuid: Scalars['ID'];
};

export type EnableOrganizationPayloadType = {
  __typename?: 'EnableOrganizationPayloadType';
  organization?: Maybe<OrganizationType>;
};

export type EnableUserInput = {
  uuid: Scalars['ID'];
};

export type EnableUserPayloadType = {
  __typename?: 'EnableUserPayloadType';
  user?: Maybe<UserType>;
};

export type InvitateUserErrorType = {
  __typename?: 'InvitateUserErrorType';
  user?: Maybe<UserOutput>;
  description?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type InviteOrganizationUserPayload = {
  __typename?: 'InviteOrganizationUserPayload';
  organizationUuid: Scalars['String'];
  invitationErrors?: Maybe<Array<Maybe<InvitateUserErrorType>>>;
  invitedUsers?: Maybe<Array<Maybe<UserOutput>>>;
};

export type InviteOrganizationsUsersInput = {
  organizationUuid: Scalars['String'];
  users: Array<InviteUserInput>;
};

export type InviteUserInput = {
  email: Scalars['String'];
  roleUuid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  inviteOrganizationUsers?: Maybe<InviteOrganizationUserPayload>;
  createOrganization?: Maybe<CreateOrganizationPayloadType>;
  updateOrganizationUser?: Maybe<OrganizationUserPayloadType>;
  requestUserPasswordReset?: Maybe<Scalars['String']>;
  resetUserPassword?: Maybe<Scalars['String']>;
  updateUser?: Maybe<UpdateUserPayloadType>;
  blockUser?: Maybe<BlockUserPayloadType>;
  deleteUser?: Maybe<DeleteUserPayloadType>;
  disableUser?: Maybe<DisableUserPayloadType>;
  enableUser?: Maybe<EnableUserPayloadType>;
  acceptOrganizationUserInvite?: Maybe<Scalars['String']>;
  enableOrganization?: Maybe<EnableOrganizationPayloadType>;
  disableOrganization?: Maybe<DisableOrganizationPayloadType>;
  createRole?: Maybe<CreateRolePayloadType>;
  /** Creates a new User Permission */
  assignUserPermission?: Maybe<AssignUserPermissionPayloadType>;
  /** Creates a new Role Permission */
  assignRolePermission?: Maybe<AssignRolePermissionPayloadType>;
  /** Updates the Role name and description */
  updateRole?: Maybe<UpdateRolePayloadType>;
};


export type MutationInviteOrganizationUsersArgs = {
  input: InviteOrganizationsUsersInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationUpdateOrganizationUserArgs = {
  input: OrganizationUserInput;
};


export type MutationRequestUserPasswordResetArgs = {
  input: RequestUserPasswordResetInput;
};


export type MutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationBlockUserArgs = {
  input: BlockUserInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDisableUserArgs = {
  input: DisableUserInput;
};


export type MutationEnableUserArgs = {
  input: EnableUserInput;
};


export type MutationAcceptOrganizationUserInviteArgs = {
  input: AcceptOrganizationUserInput;
};


export type MutationEnableOrganizationArgs = {
  input: EnableOrganizationInput;
};


export type MutationDisableOrganizationArgs = {
  input: DisableOrganizationInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInputType;
};


export type MutationAssignUserPermissionArgs = {
  input: AssignUserPermissionInputType;
};


export type MutationAssignRolePermissionArgs = {
  input: AssignRolePermissionInputType;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInputType;
};

export enum OrganizationEnumType {
  Advocacy = 'ADVOCACY',
  Agency = 'AGENCY',
  Association = 'ASSOCIATION',
  Corporate = 'CORPORATE',
  Education = 'EDUCATION',
  Electoral = 'ELECTORAL',
  Foundation = 'FOUNDATION',
  Mixed = 'MIXED',
  Nonprofit = 'NONPROFIT',
  Other = 'OTHER',
  Pac = 'PAC',
  Philanthropy = 'PHILANTHROPY'
}

export type OrganizationInput = {
  uuid?: Maybe<Scalars['ID']>;
};

export type OrganizationNested = {
  __typename?: 'OrganizationNested';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnumType>;
  subscriptionType?: Maybe<SubscriptionEnumType>;
  organizations?: Maybe<Array<Maybe<OrganizationNested1>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  organizationPermissions?: Maybe<OrganizationPermissionType>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type OrganizationNested1 = {
  __typename?: 'OrganizationNested1';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnumType>;
  subscriptionType?: Maybe<SubscriptionEnumType>;
  organizations?: Maybe<Array<Maybe<OrganizationNested2>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  organizationPermissions?: Maybe<OrganizationPermissionType>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type OrganizationNested2 = {
  __typename?: 'OrganizationNested2';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnumType>;
  subscriptionType?: Maybe<SubscriptionEnumType>;
  organizations?: Maybe<Array<Maybe<OrganizationNested3>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  organizationPermissions?: Maybe<OrganizationPermissionType>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type OrganizationNested3 = {
  __typename?: 'OrganizationNested3';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnumType>;
  subscriptionType?: Maybe<SubscriptionEnumType>;
  organizations?: Maybe<Array<Maybe<OrganizationNested4>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  organizationPermissions?: Maybe<OrganizationPermissionType>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type OrganizationNested4 = {
  __typename?: 'OrganizationNested4';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnumType>;
  subscriptionType?: Maybe<SubscriptionEnumType>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  organizationPermissions?: Maybe<OrganizationPermissionType>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type OrganizationPermissionType = {
  __typename?: 'OrganizationPermissionType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  organizationUuid?: Maybe<Scalars['ID']>;
  permission?: Maybe<PermissionType>;
  permissionUuid?: Maybe<Scalars['ID']>;
  ability?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type OrganizationRolePermissionsConnection = {
  __typename?: 'OrganizationRolePermissionsConnection';
  /** Information to aid in pagination. */
  pageInfo?: Maybe<PageInfo>;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OrganizationRolePermissionsEdge>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type OrganizationRolePermissionsEdge = {
  __typename?: 'OrganizationRolePermissionsEdge';
  /** The item at the end of the edge */
  node?: Maybe<PermissionType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrganizationRolePermissionsInput = {
  organizationUuid: Scalars['ID'];
};

export type OrganizationType = {
  __typename?: 'OrganizationType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnumType>;
  subscriptionType?: Maybe<SubscriptionEnumType>;
  organizations?: Maybe<Array<Maybe<OrganizationNested>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  organizationPermissions?: Maybe<OrganizationPermissionType>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type OrganizationUserInput = {
  uuid: Scalars['ID'];
  status?: Maybe<StatusEnumType>;
  userUuid?: Maybe<Scalars['ID']>;
  organizationUuid?: Maybe<Scalars['ID']>;
  roleUuid?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type OrganizationUserPayloadType = {
  __typename?: 'OrganizationUserPayloadType';
  organizationUser?: Maybe<OrganizationUserType>;
};

/** A connection to a list of items. */
export type OrganizationUserPermissionsConnection = {
  __typename?: 'OrganizationUserPermissionsConnection';
  /** Information to aid in pagination. */
  pageInfo?: Maybe<PageInfo>;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OrganizationUserPermissionsEdge>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type OrganizationUserPermissionsEdge = {
  __typename?: 'OrganizationUserPermissionsEdge';
  /** The item at the end of the edge */
  node?: Maybe<PermissionType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrganizationUserPermissionsInput = {
  organizationUserUuid: Scalars['ID'];
};

export type OrganizationUserType = {
  __typename?: 'OrganizationUserType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  title?: Maybe<Scalars['String']>;
  userUuid?: Maybe<Scalars['ID']>;
  organization?: Maybe<OrganizationType>;
  organizationUuid?: Maybe<Scalars['ID']>;
  role?: Maybe<RoleType>;
  roleUuid?: Maybe<Scalars['ID']>;
  userPermissions?: Maybe<Array<Maybe<UserPermissionType>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type PermissionInput = {
  uuid: Scalars['ID'];
};

export type PermissionType = {
  __typename?: 'PermissionType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  abilities?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type PermissionsConnection = {
  __typename?: 'PermissionsConnection';
  /** Information to aid in pagination. */
  pageInfo?: Maybe<PageInfo>;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PermissionsEdge>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type PermissionsEdge = {
  __typename?: 'PermissionsEdge';
  /** The item at the end of the edge */
  node?: Maybe<PermissionType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type RequestUserPasswordResetInput = {
  email: Scalars['String'];
};

export type ResetUserPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type RoleInput = {
  uuid?: Maybe<Scalars['ID']>;
};

export type RolePermissionType = {
  __typename?: 'RolePermissionType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  role?: Maybe<RoleType>;
  roleUuid?: Maybe<Scalars['ID']>;
  permission?: Maybe<PermissionType>;
  permissionUuid?: Maybe<Scalars['ID']>;
  ability?: Maybe<Scalars['String']>;
};

export type RoleType = {
  __typename?: 'RoleType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  organizationUuid: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};

export type RolesInput = {
  organizationUuid?: Maybe<Scalars['ID']>;
};

/** The top-level API */
export type RootQueryType = {
  __typename?: 'RootQueryType';
  migration?: Maybe<Scalars['String']>;
  role?: Maybe<RoleType>;
  roles?: Maybe<Array<Maybe<RoleType>>>;
  user?: Maybe<UserType>;
  users?: Maybe<UserConnection>;
  organization?: Maybe<OrganizationType>;
  organizations?: Maybe<Array<Maybe<OrganizationType>>>;
  validateAssociationToken?: Maybe<ValidateAssociationTokenPayloadType>;
  permission?: Maybe<PermissionType>;
  permissions?: Maybe<PermissionsConnection>;
  organizationRolePermissions?: Maybe<OrganizationRolePermissionsConnection>;
  organizationUserPermissions?: Maybe<OrganizationUserPermissionsConnection>;
};


/** The top-level API */
export type RootQueryTypeMigrationArgs = {
  seed?: Maybe<Scalars['Boolean']>;
  reset?: Maybe<Scalars['Boolean']>;
};


/** The top-level API */
export type RootQueryTypeRoleArgs = {
  input: RoleInput;
};


/** The top-level API */
export type RootQueryTypeRolesArgs = {
  input?: Maybe<RolesInput>;
};


/** The top-level API */
export type RootQueryTypeUserArgs = {
  input: UserInput;
};


/** The top-level API */
export type RootQueryTypeUsersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  input?: Maybe<UsersInput>;
};


/** The top-level API */
export type RootQueryTypeOrganizationArgs = {
  input?: Maybe<OrganizationInput>;
};


/** The top-level API */
export type RootQueryTypeValidateAssociationTokenArgs = {
  input: ValidateAssociationTokenInputType;
};


/** The top-level API */
export type RootQueryTypePermissionArgs = {
  input: PermissionInput;
};


/** The top-level API */
export type RootQueryTypePermissionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


/** The top-level API */
export type RootQueryTypeOrganizationRolePermissionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  input?: Maybe<OrganizationRolePermissionsInput>;
};


/** The top-level API */
export type RootQueryTypeOrganizationUserPermissionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  input?: Maybe<OrganizationUserPermissionsInput>;
};

export enum StatusEnumType {
  Deleted = 'DELETED',
  Blocked = 'BLOCKED',
  Suspended = 'SUSPENDED',
  Pending = 'PENDING',
  Active = 'ACTIVE'
}

export enum SubscriptionEnumType {
  Explorer = 'EXPLORER',
  Starter = 'STARTER',
  Basic = 'BASIC',
  Premium = 'PREMIUM',
  Enterprise = 'ENTERPRISE'
}

export type UpdateRoleInputType = {
  uuid: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  organizationUuid: Scalars['String'];
};

export type UpdateRolePayloadType = {
  __typename?: 'UpdateRolePayloadType';
  role?: Maybe<RoleType>;
};

export type UpdateUserInput = {
  uuid: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type UpdateUserPayloadType = {
  __typename?: 'UpdateUserPayloadType';
  user?: Maybe<UserType>;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** Information to aid in pagination. */
  pageInfo?: Maybe<PageInfo>;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** The item at the end of the edge */
  node?: Maybe<UserType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type UserInput = {
  uuid?: Maybe<Scalars['ID']>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  email: Scalars['String'];
  roleUuid: Scalars['String'];
};

export type UserPermissionType = {
  __typename?: 'UserPermissionType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  organizationUserUuid?: Maybe<Scalars['ID']>;
  permission?: Maybe<PermissionType>;
  permissionUuid?: Maybe<Scalars['ID']>;
  ability?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnumType>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  organizationUsers?: Maybe<Array<Maybe<OrganizationUserType>>>;
};

export type UsersInput = {
  search?: Maybe<Scalars['String']>;
};

export type ValidateAssociationTokenInputType = {
  token: Scalars['String'];
};

export type ValidateAssociationTokenPayloadType = {
  __typename?: 'ValidateAssociationTokenPayloadType';
  token?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FindOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsQuery = (
  { __typename?: 'RootQueryType' }
  & { organizations?: Maybe<Array<Maybe<(
    { __typename?: 'OrganizationType' }
    & Pick<OrganizationType, 'uuid' | 'organizationUuid' | 'name'>
  )>>> }
);

export type FindOrganizationTreesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationTreesQuery = (
  { __typename?: 'RootQueryType' }
  & { organizations?: Maybe<Array<Maybe<(
    { __typename?: 'OrganizationType' }
    & Pick<OrganizationType, 'uuid' | 'organizationUuid' | 'name' | 'countUsers'>
    & { organizations?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationNested' }
      & Pick<OrganizationNested, 'uuid' | 'organizationUuid' | 'name' | 'countUsers'>
      & { organizations?: Maybe<Array<Maybe<(
        { __typename?: 'OrganizationNested1' }
        & Pick<OrganizationNested1, 'uuid' | 'organizationUuid' | 'name' | 'countUsers'>
        & { organizations?: Maybe<Array<Maybe<(
          { __typename?: 'OrganizationNested2' }
          & Pick<OrganizationNested2, 'uuid' | 'organizationUuid' | 'name' | 'countUsers'>
          & { organizations?: Maybe<Array<Maybe<(
            { __typename?: 'OrganizationNested3' }
            & Pick<OrganizationNested3, 'uuid' | 'organizationUuid' | 'name' | 'countUsers'>
            & { organizations?: Maybe<Array<Maybe<(
              { __typename?: 'OrganizationNested4' }
              & Pick<OrganizationNested4, 'uuid' | 'organizationUuid' | 'name' | 'countUsers'>
            )>>> }
          )>>> }
        )>>> }
      )>>> }
    )>>> }
  )>>> }
);

export type FindOrganizationsWithRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsWithRolesQuery = (
  { __typename?: 'RootQueryType' }
  & { organizations?: Maybe<Array<Maybe<(
    { __typename?: 'OrganizationType' }
    & Pick<OrganizationType, 'uuid' | 'name' | 'organizationUuid'>
    & { roles?: Maybe<Array<Maybe<(
      { __typename?: 'RoleType' }
      & Pick<RoleType, 'uuid'>
    )>>>, organizations?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationNested' }
      & Pick<OrganizationNested, 'uuid' | 'name' | 'organizationUuid'>
      & { roles?: Maybe<Array<Maybe<(
        { __typename?: 'RoleType' }
        & Pick<RoleType, 'uuid'>
      )>>>, organizations?: Maybe<Array<Maybe<(
        { __typename?: 'OrganizationNested1' }
        & Pick<OrganizationNested1, 'uuid' | 'name' | 'organizationUuid'>
        & { roles?: Maybe<Array<Maybe<(
          { __typename?: 'RoleType' }
          & Pick<RoleType, 'uuid'>
        )>>>, organizations?: Maybe<Array<Maybe<(
          { __typename?: 'OrganizationNested2' }
          & Pick<OrganizationNested2, 'uuid' | 'name' | 'organizationUuid'>
          & { roles?: Maybe<Array<Maybe<(
            { __typename?: 'RoleType' }
            & Pick<RoleType, 'uuid'>
          )>>>, organizations?: Maybe<Array<Maybe<(
            { __typename?: 'OrganizationNested3' }
            & Pick<OrganizationNested3, 'uuid' | 'name' | 'organizationUuid'>
            & { roles?: Maybe<Array<Maybe<(
              { __typename?: 'RoleType' }
              & Pick<RoleType, 'uuid'>
            )>>>, organizations?: Maybe<Array<Maybe<(
              { __typename?: 'OrganizationNested4' }
              & Pick<OrganizationNested4, 'uuid' | 'name' | 'organizationUuid'>
              & { roles?: Maybe<Array<Maybe<(
                { __typename?: 'RoleType' }
                & Pick<RoleType, 'uuid'>
              )>>> }
            )>>> }
          )>>> }
        )>>> }
      )>>> }
    )>>> }
  )>>> }
);

export type SendInvitationMutationVariables = Exact<{
  input: InviteOrganizationsUsersInput;
}>;


export type SendInvitationMutation = (
  { __typename?: 'Mutation' }
  & { inviteOrganizationUsers?: Maybe<(
    { __typename?: 'InviteOrganizationUserPayload' }
    & Pick<InviteOrganizationUserPayload, 'organizationUuid'>
    & { invitationErrors?: Maybe<Array<Maybe<(
      { __typename?: 'InvitateUserErrorType' }
      & Pick<InvitateUserErrorType, 'description'>
      & { user?: Maybe<(
        { __typename?: 'UserOutput' }
        & Pick<UserOutput, 'email' | 'roleUuid'>
      )> }
    )>>>, invitedUsers?: Maybe<Array<Maybe<(
      { __typename?: 'UserOutput' }
      & Pick<UserOutput, 'email'>
    )>>> }
  )> }
);

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization?: Maybe<(
    { __typename?: 'CreateOrganizationPayloadType' }
    & { organization?: Maybe<(
      { __typename?: 'OrganizationType' }
      & Pick<OrganizationType, 'uuid' | 'name'>
    )> }
  )> }
);

export type UpdateOrganizationUserMutationVariables = Exact<{
  input: OrganizationUserInput;
}>;


export type UpdateOrganizationUserMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganizationUser?: Maybe<(
    { __typename?: 'OrganizationUserPayloadType' }
    & { organizationUser?: Maybe<(
      { __typename?: 'OrganizationUserType' }
      & Pick<OrganizationUserType, 'uuid' | 'organizationUuid'>
      & { role?: Maybe<(
        { __typename?: 'RoleType' }
        & Pick<RoleType, 'uuid' | 'name'>
      )> }
    )> }
  )> }
);

export type FindRolesQueryVariables = Exact<{
  input?: Maybe<RolesInput>;
}>;


export type FindRolesQuery = (
  { __typename?: 'RootQueryType' }
  & { roles?: Maybe<Array<Maybe<(
    { __typename?: 'RoleType' }
    & Pick<RoleType, 'uuid' | 'name'>
  )>>> }
);

export type FindUserQueryVariables = Exact<{
  input: UserInput;
}>;


export type FindUserQuery = (
  { __typename?: 'RootQueryType' }
  & { user?: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'uuid' | 'status' | 'firstName' | 'lastName' | 'email' | 'phone' | 'resetToken'>
    & { organizationUsers?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationUserType' }
      & Pick<OrganizationUserType, 'uuid' | 'status' | 'organizationUuid' | 'title'>
      & { organization?: Maybe<(
        { __typename?: 'OrganizationType' }
        & Pick<OrganizationType, 'uuid' | 'name'>
      )>, role?: Maybe<(
        { __typename?: 'RoleType' }
        & Pick<RoleType, 'uuid' | 'name'>
      )> }
    )>>> }
  )> }
);

export type AcceptOrganizationUserInviteMutationVariables = Exact<{
  input: AcceptOrganizationUserInput;
}>;


export type AcceptOrganizationUserInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptOrganizationUserInvite'>
);

export type FindMembersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  input?: Maybe<UsersInput>;
}>;


export type FindMembersQuery = (
  { __typename?: 'RootQueryType' }
  & { users?: Maybe<(
    { __typename?: 'UserConnection' }
    & Pick<UserConnection, 'totalCount'>
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'startCursor' | 'endCursor'>
    )>, edges?: Maybe<Array<Maybe<(
      { __typename?: 'UserEdge' }
      & Pick<UserEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'UserType' }
        & Pick<UserType, 'uuid' | 'firstName' | 'lastName' | 'email' | 'phone'>
        & { organizationUsers?: Maybe<Array<Maybe<(
          { __typename?: 'OrganizationUserType' }
          & Pick<OrganizationUserType, 'title'>
          & { organization?: Maybe<(
            { __typename?: 'OrganizationType' }
            & Pick<OrganizationType, 'uuid' | 'name'>
          )>, role?: Maybe<(
            { __typename?: 'RoleType' }
            & Pick<RoleType, 'uuid' | 'name'>
          )> }
        )>>> }
      )> }
    )>>> }
  )> }
);

export type ValidateAssociationTokenQueryVariables = Exact<{
  input: ValidateAssociationTokenInputType;
}>;


export type ValidateAssociationTokenQuery = (
  { __typename?: 'RootQueryType' }
  & { validateAssociationToken?: Maybe<(
    { __typename?: 'ValidateAssociationTokenPayloadType' }
    & Pick<ValidateAssociationTokenPayloadType, 'status' | 'email' | 'name'>
  )> }
);

export type RequestUserPasswordResetMutationVariables = Exact<{
  input: RequestUserPasswordResetInput;
}>;


export type RequestUserPasswordResetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestUserPasswordReset'>
);

export type ResetUserPasswordMutationVariables = Exact<{
  input: ResetUserPasswordInput;
}>;


export type ResetUserPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetUserPassword'>
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UpdateUserPayloadType' }
    & { user?: Maybe<(
      { __typename?: 'UserType' }
      & Pick<UserType, 'uuid'>
    )> }
  )> }
);

export const FindOrganizationsDocument = gql`
    query findOrganizations {
  organizations {
    uuid
    organizationUuid
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindOrganizationsGQL extends Apollo.Query<FindOrganizationsQuery, FindOrganizationsQueryVariables> {
    document = FindOrganizationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindOrganizationTreesDocument = gql`
    query findOrganizationTrees {
  organizations {
    uuid
    organizationUuid
    name
    countUsers
    organizations {
      uuid
      organizationUuid
      name
      countUsers
      organizations {
        uuid
        organizationUuid
        name
        countUsers
        organizations {
          uuid
          organizationUuid
          name
          countUsers
          organizations {
            uuid
            organizationUuid
            name
            countUsers
            organizations {
              uuid
              organizationUuid
              name
              countUsers
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindOrganizationTreesGQL extends Apollo.Query<FindOrganizationTreesQuery, FindOrganizationTreesQueryVariables> {
    document = FindOrganizationTreesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindOrganizationsWithRolesDocument = gql`
    query findOrganizationsWithRoles {
  organizations {
    uuid
    name
    organizationUuid
    roles {
      uuid
    }
    organizations {
      uuid
      name
      organizationUuid
      roles {
        uuid
      }
      organizations {
        uuid
        name
        organizationUuid
        roles {
          uuid
        }
        organizations {
          uuid
          name
          organizationUuid
          roles {
            uuid
          }
          organizations {
            uuid
            name
            organizationUuid
            roles {
              uuid
            }
            organizations {
              uuid
              name
              organizationUuid
              roles {
                uuid
              }
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindOrganizationsWithRolesGQL extends Apollo.Query<FindOrganizationsWithRolesQuery, FindOrganizationsWithRolesQueryVariables> {
    document = FindOrganizationsWithRolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SendInvitationDocument = gql`
    mutation sendInvitation($input: InviteOrganizationsUsersInput!) {
  inviteOrganizationUsers(input: $input) {
    organizationUuid
    invitationErrors {
      user {
        email
        roleUuid
      }
      description
    }
    invitedUsers {
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendInvitationGQL extends Apollo.Mutation<SendInvitationMutation, SendInvitationMutationVariables> {
    document = SendInvitationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOrganizationDocument = gql`
    mutation createOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    organization {
      uuid
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrganizationGQL extends Apollo.Mutation<CreateOrganizationMutation, CreateOrganizationMutationVariables> {
    document = CreateOrganizationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOrganizationUserDocument = gql`
    mutation updateOrganizationUser($input: OrganizationUserInput!) {
  updateOrganizationUser(input: $input) {
    organizationUser {
      uuid
      organizationUuid
      role {
        uuid
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOrganizationUserGQL extends Apollo.Mutation<UpdateOrganizationUserMutation, UpdateOrganizationUserMutationVariables> {
    document = UpdateOrganizationUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindRolesDocument = gql`
    query findRoles($input: RolesInput) {
  roles(input: $input) {
    uuid
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindRolesGQL extends Apollo.Query<FindRolesQuery, FindRolesQueryVariables> {
    document = FindRolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindUserDocument = gql`
    query findUser($input: UserInput!) {
  user(input: $input) {
    uuid
    status
    firstName
    lastName
    email
    phone
    resetToken
    organizationUsers {
      uuid
      status
      organizationUuid
      organization {
        uuid
        name
      }
      role {
        uuid
        name
      }
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindUserGQL extends Apollo.Query<FindUserQuery, FindUserQueryVariables> {
    document = FindUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AcceptOrganizationUserInviteDocument = gql`
    mutation acceptOrganizationUserInvite($input: AcceptOrganizationUserInput!) {
  acceptOrganizationUserInvite(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AcceptOrganizationUserInviteGQL extends Apollo.Mutation<AcceptOrganizationUserInviteMutation, AcceptOrganizationUserInviteMutationVariables> {
    document = AcceptOrganizationUserInviteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindMembersDocument = gql`
    query findMembers($after: String, $first: Int, $input: UsersInput) {
  users(first: $first, after: $after, input: $input) {
    totalCount
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        uuid
        firstName
        lastName
        email
        phone
        organizationUsers {
          organization {
            uuid
            name
          }
          role {
            uuid
            name
          }
          title
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindMembersGQL extends Apollo.Query<FindMembersQuery, FindMembersQueryVariables> {
    document = FindMembersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ValidateAssociationTokenDocument = gql`
    query validateAssociationToken($input: ValidateAssociationTokenInputType!) {
  validateAssociationToken(input: $input) {
    status
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ValidateAssociationTokenGQL extends Apollo.Query<ValidateAssociationTokenQuery, ValidateAssociationTokenQueryVariables> {
    document = ValidateAssociationTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RequestUserPasswordResetDocument = gql`
    mutation requestUserPasswordReset($input: RequestUserPasswordResetInput!) {
  requestUserPasswordReset(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RequestUserPasswordResetGQL extends Apollo.Mutation<RequestUserPasswordResetMutation, RequestUserPasswordResetMutationVariables> {
    document = RequestUserPasswordResetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ResetUserPasswordDocument = gql`
    mutation resetUserPassword($input: ResetUserPasswordInput!) {
  resetUserPassword(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ResetUserPasswordGQL extends Apollo.Mutation<ResetUserPasswordMutation, ResetUserPasswordMutationVariables> {
    document = ResetUserPasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      uuid
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }