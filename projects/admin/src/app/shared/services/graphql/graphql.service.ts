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
  token?: Maybe<Scalars['String']>;
  user?: Maybe<AcceptOrganizationUserInputUser>;
};

export type AcceptOrganizationUserInputUser = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export enum ActivityLogEnum {
  Create = 'CREATE',
  Update = 'UPDATE',
  Delete = 'DELETE',
  Remove = 'REMOVE',
  Suspend = 'SUSPEND',
  Activate = 'ACTIVATE',
  Block = 'BLOCK'
}

export type AssignRolePermissionInput = {
  roleUuid: Scalars['String'];
  permissionUuid: Scalars['String'];
  ability: Scalars['String'];
};

export type AssignUserPermissionInputType = {
  __typename?: 'AssignUserPermissionInputType';
  organizationUserId: Scalars['String'];
  permissionId: Scalars['String'];
  ability: Scalars['String'];
};

export type CreateOrganizationHostnameInput = {
  hostname: Scalars['String'];
  domainType: DomainTypeEnum;
  fromEmail?: Maybe<Scalars['String']>;
  fromName?: Maybe<Scalars['String']>;
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
  organizationUuid?: Maybe<Scalars['ID']>;
  adminEmail: Scalars['String'];
  subscriptionType: SubscriptionEnum;
  organizationType: OrganizationEnum;
};

export type CreateRoleInput = {
  organizationId: Scalars['String'];
  roleName: Scalars['String'];
  roleDescription?: Maybe<Scalars['String']>;
};

export type DeleteOrganizationHostnameInput = {
  uuid: Scalars['String'];
};

export type DeleteRoleInput = {
  uuid: Scalars['String'];
  roleUuid: Scalars['String'];
};

export enum DomainTypeEnum {
  Email = 'EMAIL',
  LandingPage = 'LANDING_PAGE'
}

export type InviteOrganizationUserInput = {
  token?: Maybe<Scalars['String']>;
  user?: Maybe<InviteOrganizationUserInputUser>;
};

export type InviteOrganizationUserInputUser = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type InviteOrganizationUserInvitationErrors = {
  __typename?: 'InviteOrganizationUserInvitationErrors';
  email: Scalars['String'];
  description: Scalars['String'];
};

export type InviteOrganizationUserPayload = {
  __typename?: 'InviteOrganizationUserPayload';
  organizationUuid: Scalars['String'];
  invitationErrors?: Maybe<Array<Maybe<InviteOrganizationUserInvitationErrors>>>;
  invitedUsers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type InviteOrganizationUsersEmailRoleInput = {
  email: Scalars['String'];
  roleUuid: Scalars['String'];
};

export type InviteOrganizationUsersInput = {
  organizationUuid: Scalars['String'];
  users: Array<Maybe<InviteOrganizationUsersEmailRoleInput>>;
};

export type MigratePayload = {
  __typename?: 'MigratePayload';
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrganizationUserInvite?: Maybe<Scalars['String']>;
  createOrganization?: Maybe<SchemaOrganization>;
  disableOrganization?: Maybe<SchemaOrganization>;
  enableOrganization?: Maybe<SchemaOrganization>;
  inviteOrganizationUsers?: Maybe<InviteOrganizationUserPayload>;
  assignUserPermission?: Maybe<SchemaUserPermission>;
  blockUser?: Maybe<SchemaUser>;
  deleteUser?: Maybe<SchemaUser>;
  disableUser?: Maybe<SchemaUser>;
  enableUser?: Maybe<SchemaUser>;
  requestUserPasswordReset?: Maybe<Scalars['Boolean']>;
  resetUserPassword?: Maybe<Scalars['Boolean']>;
  assignRolePermission?: Maybe<SchemaRolePermission>;
  createRole?: Maybe<SchemaRole>;
  deleteRole?: Maybe<SchemaRole>;
  updateRole?: Maybe<SchemaRole>;
  blockOrganizationUser?: Maybe<SchemaOrganizationUser>;
  deleteOrganizationUser?: Maybe<SchemaOrganizationUser>;
  updateOrganizationUser?: Maybe<SchemaOrganizationUser>;
  updateUser?: Maybe<SchemaUser>;
  createOrganizationHostname?: Maybe<SchemaOrganizationHostname>;
  deleteOrganizationHostname?: Maybe<SchemaOrganizationHostname>;
};


export type MutationAcceptOrganizationUserInviteArgs = {
  input: AcceptOrganizationUserInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationDisableOrganizationArgs = {
  uuid: Scalars['ID'];
};


export type MutationEnableOrganizationArgs = {
  uuid: Scalars['ID'];
};


export type MutationInviteOrganizationUsersArgs = {
  input: InviteOrganizationUsersInput;
};


export type MutationAssignUserPermissionArgs = {
  uuid: Scalars['ID'];
};


export type MutationBlockUserArgs = {
  uuid: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  uuid: Scalars['ID'];
};


export type MutationDisableUserArgs = {
  uuid: Scalars['ID'];
};


export type MutationEnableUserArgs = {
  uuid: Scalars['ID'];
};


export type MutationRequestUserPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput;
};


export type MutationAssignRolePermissionArgs = {
  input: AssignRolePermissionInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationBlockOrganizationUserArgs = {
  uuid: Scalars['ID'];
};


export type MutationDeleteOrganizationUserArgs = {
  uuid: Scalars['ID'];
};


export type MutationUpdateOrganizationUserArgs = {
  input: UpdateOrganizationUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationCreateOrganizationHostnameArgs = {
  input: CreateOrganizationHostnameInput;
};


export type MutationDeleteOrganizationHostnameArgs = {
  input: DeleteOrganizationHostnameInput;
};

export enum OrganizationEnum {
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

export type Query = {
  __typename?: 'Query';
  organization?: Maybe<SchemaOrganization>;
  organizations?: Maybe<Array<Maybe<SchemaOrganization>>>;
  myOrganizations?: Maybe<Array<Maybe<SchemaOrganization>>>;
  permission?: Maybe<SchemaPermission>;
  permissions?: Maybe<Array<Maybe<SchemaPermission>>>;
  role?: Maybe<SchemaRole>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  user?: Maybe<SchemaUser>;
  users?: Maybe<Array<Maybe<SchemaUser>>>;
  validateAssociationToken?: Maybe<ValidateAssociationTokenPayload>;
  validatePasswordResetToken?: Maybe<Scalars['Boolean']>;
  organizationHostname?: Maybe<SchemaOrganizationHostname>;
  organizationHostnames?: Maybe<Array<Maybe<SchemaOrganizationHostname>>>;
  migrate?: Maybe<MigratePayload>;
};


export type QueryOrganizationArgs = {
  uuid: Scalars['ID'];
};


export type QueryOrganizationsArgs = {
  search?: Maybe<Scalars['String']>;
};


export type QueryPermissionArgs = {
  uuid: Scalars['ID'];
};


export type QueryRoleArgs = {
  uuid: Scalars['ID'];
};


export type QueryRolesArgs = {
  organizationUuid: Scalars['ID'];
};


export type QueryUserArgs = {
  uuid: Scalars['ID'];
};


export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>;
};


export type QueryValidateAssociationTokenArgs = {
  token: Scalars['String'];
};


export type QueryValidatePasswordResetTokenArgs = {
  token: Scalars['String'];
};


export type QueryOrganizationHostnameArgs = {
  uuid: Scalars['ID'];
};


export type QueryOrganizationHostnamesArgs = {
  domainType?: Maybe<DomainTypeEnum>;
};


export type QueryMigrateArgs = {
  reset: Scalars['Boolean'];
  seed: Scalars['Boolean'];
};

export type ResetUserPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type SchemaActivityLog = {
  __typename?: 'SchemaActivityLog';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<SchemaUser>;
  userUuid?: Maybe<Scalars['ID']>;
  organization?: Maybe<SchemaOrganization>;
  organizationUuid?: Maybe<Scalars['ID']>;
  action?: Maybe<ActivityLogEnum>;
  modelName?: Maybe<Scalars['String']>;
  modelUuid?: Maybe<Scalars['ID']>;
};

export type SchemaOrganization = {
  __typename?: 'SchemaOrganization';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnum>;
  subscriptionType?: Maybe<SubscriptionEnum>;
  organizations?: Maybe<Array<Maybe<SchemaOrganizationNested1>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type SchemaOrganizationHostname = {
  __typename?: 'SchemaOrganizationHostname';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<SchemaUser>;
  createdBy?: Maybe<Scalars['ID']>;
  organization?: Maybe<SchemaOrganization>;
  organizationUuid?: Maybe<Scalars['ID']>;
  status?: Maybe<StatusEnum>;
  hostname?: Maybe<Scalars['String']>;
  verifiedAt?: Maybe<Scalars['String']>;
  txtValue?: Maybe<Scalars['String']>;
  domainType?: Maybe<DomainTypeEnum>;
};

export type SchemaOrganizationNested1 = {
  __typename?: 'SchemaOrganizationNested1';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnum>;
  subscriptionType?: Maybe<SubscriptionEnum>;
  organizations?: Maybe<Array<Maybe<SchemaOrganizationNested2>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type SchemaOrganizationNested2 = {
  __typename?: 'SchemaOrganizationNested2';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnum>;
  subscriptionType?: Maybe<SubscriptionEnum>;
  organizations?: Maybe<Array<Maybe<SchemaOrganizationNested3>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type SchemaOrganizationNested3 = {
  __typename?: 'SchemaOrganizationNested3';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnum>;
  subscriptionType?: Maybe<SubscriptionEnum>;
  organizations?: Maybe<Array<Maybe<SchemaOrganizationNested4>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type SchemaOrganizationNested4 = {
  __typename?: 'SchemaOrganizationNested4';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnum>;
  subscriptionType?: Maybe<SubscriptionEnum>;
  organizations?: Maybe<Array<Maybe<SchemaOrganizationNested5>>>;
  organizationUuid?: Maybe<Scalars['ID']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type SchemaOrganizationNested5 = {
  __typename?: 'SchemaOrganizationNested5';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  name: Scalars['String'];
  organizationType?: Maybe<OrganizationEnum>;
  subscriptionType?: Maybe<SubscriptionEnum>;
  organizationUuid?: Maybe<Scalars['ID']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
  roles?: Maybe<Array<Maybe<SchemaRole>>>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  countUsers?: Maybe<Scalars['Int']>;
};

export type SchemaOrganizationPermission = {
  __typename?: 'SchemaOrganizationPermission';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  organization?: Maybe<SchemaOrganization>;
  organizationUuid?: Maybe<Scalars['ID']>;
  permission?: Maybe<SchemaPermission>;
  permissionUuid?: Maybe<Scalars['ID']>;
  ability?: Maybe<Scalars['String']>;
};

export type SchemaOrganizationUser = {
  __typename?: 'SchemaOrganizationUser';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<SchemaUser>;
  userUuid?: Maybe<Scalars['ID']>;
  organization?: Maybe<SchemaOrganization>;
  organizationUuid?: Maybe<Scalars['ID']>;
  role?: Maybe<SchemaRole>;
  roleUuid?: Maybe<Scalars['ID']>;
  userPermissions?: Maybe<Array<Maybe<SchemaUserPermission>>>;
};

export type SchemaPermission = {
  __typename?: 'SchemaPermission';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  abilities?: Maybe<Scalars['String']>;
  organizationPermissions?: Maybe<Array<Maybe<SchemaOrganizationPermission>>>;
  rolePermissions?: Maybe<Array<Maybe<SchemaRolePermission>>>;
  userPermissions?: Maybe<Array<Maybe<SchemaUserPermission>>>;
};

export type SchemaRole = {
  __typename?: 'SchemaRole';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  organizationUuid: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type SchemaRolePermission = {
  __typename?: 'SchemaRolePermission';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  role?: Maybe<SchemaRole>;
  roleUuid?: Maybe<Scalars['ID']>;
  permission?: Maybe<SchemaPermission>;
  permissionUuid?: Maybe<Scalars['ID']>;
  ability?: Maybe<Scalars['String']>;
};

export type SchemaUser = {
  __typename?: 'SchemaUser';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  organizationUsers?: Maybe<Array<Maybe<SchemaOrganizationUser>>>;
};

export type SchemaUserPermission = {
  __typename?: 'SchemaUserPermission';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  organizationUser?: Maybe<SchemaOrganizationUser>;
  organizationUserUuid?: Maybe<Scalars['ID']>;
  permission?: Maybe<SchemaPermission>;
  permissionUuid?: Maybe<Scalars['ID']>;
  ability?: Maybe<Scalars['String']>;
};

export enum StatusEnum {
  Deleted = 'DELETED',
  Blocked = 'BLOCKED',
  Suspended = 'SUSPENDED',
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Verified = 'VERIFIED',
  Unverified = 'UNVERIFIED'
}

export enum SubscriptionEnum {
  Explorer = 'EXPLORER',
  Starter = 'STARTER',
  Basic = 'BASIC',
  Premium = 'PREMIUM',
  Enterprise = 'ENTERPRISE'
}

export type UpdateOrganizationUserInput = {
  uuid: Scalars['ID'];
  roleUuid?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  uuid: Scalars['String'];
  organizationId: Scalars['String'];
  roleName: Scalars['String'];
  roleDescription?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  uuid: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type ValidateAssociationTokenPayload = {
  __typename?: 'ValidateAssociationTokenPayload';
  token?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GetDomainsQueryVariables = Exact<{
  domainType?: Maybe<DomainTypeEnum>;
}>;


export type GetDomainsQuery = (
  { __typename?: 'Query' }
  & { organizationHostnames?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaOrganizationHostname' }
    & Pick<SchemaOrganizationHostname, 'uuid' | 'createdAt' | 'status' | 'hostname'>
    & { user?: Maybe<(
      { __typename?: 'SchemaUser' }
      & Pick<SchemaUser, 'firstName' | 'lastName'>
    )> }
  )>>> }
);

export type FindOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsQuery = (
  { __typename?: 'Query' }
  & { organizations?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid' | 'organizationUuid' | 'name'>
  )>>> }
);

export type FindMyOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyOrganizationsQuery = (
  { __typename?: 'Query' }
  & { myOrganizations?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid' | 'name' | 'status'>
  )>>> }
);

export type FindOrganizationTreesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationTreesQuery = (
  { __typename?: 'Query' }
  & { organizations?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid' | 'organizationUuid' | 'name' | 'countUsers' | 'status'>
    & { organizations?: Maybe<Array<Maybe<(
      { __typename?: 'SchemaOrganizationNested1' }
      & Pick<SchemaOrganizationNested1, 'uuid' | 'organizationUuid' | 'name' | 'countUsers' | 'status'>
      & { organizations?: Maybe<Array<Maybe<(
        { __typename?: 'SchemaOrganizationNested2' }
        & Pick<SchemaOrganizationNested2, 'uuid' | 'organizationUuid' | 'name' | 'countUsers' | 'status'>
        & { organizations?: Maybe<Array<Maybe<(
          { __typename?: 'SchemaOrganizationNested3' }
          & Pick<SchemaOrganizationNested3, 'uuid' | 'organizationUuid' | 'name' | 'countUsers' | 'status'>
          & { organizations?: Maybe<Array<Maybe<(
            { __typename?: 'SchemaOrganizationNested4' }
            & Pick<SchemaOrganizationNested4, 'uuid' | 'organizationUuid' | 'name' | 'countUsers' | 'status'>
            & { organizations?: Maybe<Array<Maybe<(
              { __typename?: 'SchemaOrganizationNested5' }
              & Pick<SchemaOrganizationNested5, 'uuid' | 'organizationUuid' | 'name' | 'countUsers' | 'status'>
            )>>> }
          )>>> }
        )>>> }
      )>>> }
    )>>> }
  )>>> }
);

export type FindOrganizationsWithRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsWithRolesQuery = (
  { __typename?: 'Query' }
  & { organizations?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid' | 'name' | 'organizationUuid'>
    & { roles?: Maybe<Array<Maybe<(
      { __typename?: 'SchemaRole' }
      & Pick<SchemaRole, 'uuid'>
    )>>>, organizations?: Maybe<Array<Maybe<(
      { __typename?: 'SchemaOrganizationNested1' }
      & Pick<SchemaOrganizationNested1, 'uuid' | 'name' | 'organizationUuid'>
      & { roles?: Maybe<Array<Maybe<(
        { __typename?: 'SchemaRole' }
        & Pick<SchemaRole, 'uuid'>
      )>>>, organizations?: Maybe<Array<Maybe<(
        { __typename?: 'SchemaOrganizationNested2' }
        & Pick<SchemaOrganizationNested2, 'uuid' | 'name' | 'organizationUuid'>
        & { roles?: Maybe<Array<Maybe<(
          { __typename?: 'SchemaRole' }
          & Pick<SchemaRole, 'uuid'>
        )>>>, organizations?: Maybe<Array<Maybe<(
          { __typename?: 'SchemaOrganizationNested3' }
          & Pick<SchemaOrganizationNested3, 'uuid' | 'name' | 'organizationUuid'>
          & { roles?: Maybe<Array<Maybe<(
            { __typename?: 'SchemaRole' }
            & Pick<SchemaRole, 'uuid'>
          )>>>, organizations?: Maybe<Array<Maybe<(
            { __typename?: 'SchemaOrganizationNested4' }
            & Pick<SchemaOrganizationNested4, 'uuid' | 'name' | 'organizationUuid'>
            & { roles?: Maybe<Array<Maybe<(
              { __typename?: 'SchemaRole' }
              & Pick<SchemaRole, 'uuid'>
            )>>>, organizations?: Maybe<Array<Maybe<(
              { __typename?: 'SchemaOrganizationNested5' }
              & Pick<SchemaOrganizationNested5, 'uuid' | 'name' | 'organizationUuid'>
              & { roles?: Maybe<Array<Maybe<(
                { __typename?: 'SchemaRole' }
                & Pick<SchemaRole, 'uuid'>
              )>>> }
            )>>> }
          )>>> }
        )>>> }
      )>>> }
    )>>> }
  )>>> }
);

export type SendInvitationMutationVariables = Exact<{
  input: InviteOrganizationUsersInput;
}>;


export type SendInvitationMutation = (
  { __typename?: 'Mutation' }
  & { inviteOrganizationUsers?: Maybe<(
    { __typename?: 'InviteOrganizationUserPayload' }
    & Pick<InviteOrganizationUserPayload, 'organizationUuid' | 'invitedUsers'>
    & { invitationErrors?: Maybe<Array<Maybe<(
      { __typename?: 'InviteOrganizationUserInvitationErrors' }
      & Pick<InviteOrganizationUserInvitationErrors, 'email' | 'description'>
    )>>> }
  )> }
);

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization?: Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid' | 'name'>
  )> }
);

export type UpdateOrganizationUserMutationVariables = Exact<{
  input: UpdateOrganizationUserInput;
}>;


export type UpdateOrganizationUserMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganizationUser?: Maybe<(
    { __typename?: 'SchemaOrganizationUser' }
    & Pick<SchemaOrganizationUser, 'uuid' | 'organizationUuid'>
    & { role?: Maybe<(
      { __typename?: 'SchemaRole' }
      & Pick<SchemaRole, 'uuid' | 'name'>
    )> }
  )> }
);

export type DeleteOrganizationUserMutationVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type DeleteOrganizationUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteOrganizationUser?: Maybe<(
    { __typename?: 'SchemaOrganizationUser' }
    & Pick<SchemaOrganizationUser, 'uuid' | 'organizationUuid'>
    & { role?: Maybe<(
      { __typename?: 'SchemaRole' }
      & Pick<SchemaRole, 'uuid' | 'name'>
    )> }
  )> }
);

export type DisableOrganizationMutationVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type DisableOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { disableOrganization?: Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid'>
  )> }
);

export type EnableOrganizationMutationVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type EnableOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { enableOrganization?: Maybe<(
    { __typename?: 'SchemaOrganization' }
    & Pick<SchemaOrganization, 'uuid'>
  )> }
);

export type FindRolesQueryVariables = Exact<{
  organizationUuid: Scalars['ID'];
}>;


export type FindRolesQuery = (
  { __typename?: 'Query' }
  & { roles?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaRole' }
    & Pick<SchemaRole, 'uuid' | 'name'>
  )>>> }
);

export type FindUserQueryVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type FindUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'SchemaUser' }
    & Pick<SchemaUser, 'uuid' | 'status' | 'firstName' | 'lastName' | 'email' | 'phone' | 'resetToken'>
    & { organizationUsers?: Maybe<Array<Maybe<(
      { __typename?: 'SchemaOrganizationUser' }
      & Pick<SchemaOrganizationUser, 'uuid' | 'status' | 'organizationUuid' | 'title'>
      & { organization?: Maybe<(
        { __typename?: 'SchemaOrganization' }
        & Pick<SchemaOrganization, 'uuid' | 'name'>
      )>, role?: Maybe<(
        { __typename?: 'SchemaRole' }
        & Pick<SchemaRole, 'uuid' | 'name'>
      )> }
    )>>> }
  )> }
);

export type FindMembersQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
}>;


export type FindMembersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'SchemaUser' }
    & Pick<SchemaUser, 'uuid' | 'firstName' | 'lastName' | 'email' | 'phone'>
    & { organizationUsers?: Maybe<Array<Maybe<(
      { __typename?: 'SchemaOrganizationUser' }
      & Pick<SchemaOrganizationUser, 'title'>
      & { organization?: Maybe<(
        { __typename?: 'SchemaOrganization' }
        & Pick<SchemaOrganization, 'uuid' | 'name'>
      )>, role?: Maybe<(
        { __typename?: 'SchemaRole' }
        & Pick<SchemaRole, 'uuid' | 'name'>
      )> }
    )>>> }
  )>>> }
);

export type ValidateAssociationTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateAssociationTokenQuery = (
  { __typename?: 'Query' }
  & { validateAssociationToken?: Maybe<(
    { __typename?: 'ValidateAssociationTokenPayload' }
    & Pick<ValidateAssociationTokenPayload, 'status' | 'email' | 'name'>
  )> }
);

export type ValidatePasswordResetTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidatePasswordResetTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'validatePasswordResetToken'>
);

export type RequestUserPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
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
    { __typename?: 'SchemaUser' }
    & Pick<SchemaUser, 'uuid'>
  )> }
);

export type AcceptOrganizationUserInviteMutationVariables = Exact<{
  input: AcceptOrganizationUserInput;
}>;


export type AcceptOrganizationUserInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptOrganizationUserInvite'>
);

export const GetDomainsDocument = gql`
    query getDomains($domainType: DomainTypeEnum) {
  organizationHostnames(domainType: $domainType) {
    uuid
    createdAt
    user {
      firstName
      lastName
    }
    status
    hostname
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDomainsGQL extends Apollo.Query<GetDomainsQuery, GetDomainsQueryVariables> {
    document = GetDomainsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
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
export const FindMyOrganizationsDocument = gql`
    query findMyOrganizations {
  myOrganizations {
    uuid
    name
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindMyOrganizationsGQL extends Apollo.Query<FindMyOrganizationsQuery, FindMyOrganizationsQueryVariables> {
    document = FindMyOrganizationsDocument;
    
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
    status
    organizations {
      uuid
      organizationUuid
      name
      countUsers
      status
      organizations {
        uuid
        organizationUuid
        name
        countUsers
        status
        organizations {
          uuid
          organizationUuid
          name
          countUsers
          status
          organizations {
            uuid
            organizationUuid
            name
            countUsers
            status
            organizations {
              uuid
              organizationUuid
              name
              countUsers
              status
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
    mutation sendInvitation($input: InviteOrganizationUsersInput!) {
  inviteOrganizationUsers(input: $input) {
    organizationUuid
    invitationErrors {
      email
      description
    }
    invitedUsers
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
    uuid
    name
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
    mutation updateOrganizationUser($input: UpdateOrganizationUserInput!) {
  updateOrganizationUser(input: $input) {
    uuid
    organizationUuid
    role {
      uuid
      name
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
export const DeleteOrganizationUserDocument = gql`
    mutation deleteOrganizationUser($uuid: ID!) {
  deleteOrganizationUser(uuid: $uuid) {
    uuid
    organizationUuid
    role {
      uuid
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOrganizationUserGQL extends Apollo.Mutation<DeleteOrganizationUserMutation, DeleteOrganizationUserMutationVariables> {
    document = DeleteOrganizationUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DisableOrganizationDocument = gql`
    mutation disableOrganization($uuid: ID!) {
  disableOrganization(uuid: $uuid) {
    uuid
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DisableOrganizationGQL extends Apollo.Mutation<DisableOrganizationMutation, DisableOrganizationMutationVariables> {
    document = DisableOrganizationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EnableOrganizationDocument = gql`
    mutation enableOrganization($uuid: ID!) {
  enableOrganization(uuid: $uuid) {
    uuid
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EnableOrganizationGQL extends Apollo.Mutation<EnableOrganizationMutation, EnableOrganizationMutationVariables> {
    document = EnableOrganizationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindRolesDocument = gql`
    query findRoles($organizationUuid: ID!) {
  roles(organizationUuid: $organizationUuid) {
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
    query findUser($uuid: ID!) {
  user(uuid: $uuid) {
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
export const FindMembersDocument = gql`
    query findMembers($search: String) {
  users(search: $search) {
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
    query validateAssociationToken($token: String!) {
  validateAssociationToken(token: $token) {
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
export const ValidatePasswordResetTokenDocument = gql`
    query validatePasswordResetToken($token: String!) {
  validatePasswordResetToken(token: $token)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ValidatePasswordResetTokenGQL extends Apollo.Query<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables> {
    document = ValidatePasswordResetTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RequestUserPasswordResetDocument = gql`
    mutation requestUserPasswordReset($email: String!) {
  requestUserPasswordReset(email: $email)
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
    uuid
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