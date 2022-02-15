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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  StringOrList: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
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

export type Account = {
  __typename?: 'Account';
  uuid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  segment?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Status>;
};

export type AccountInput = {
  name?: Maybe<Scalars['String']>;
  segment?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Status>;
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

export type AgeCategories = {
  __typename?: 'AgeCategories';
  c_18_to_24?: Maybe<Datapoint>;
  c_25_to_34?: Maybe<Datapoint>;
  c_35_to_44?: Maybe<Datapoint>;
  c_45_to_54?: Maybe<Datapoint>;
  c_55_to_64?: Maybe<Datapoint>;
  c_65_plus?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
};

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

export type CivicModel = {
  __typename?: 'CivicModel';
  most_engaged?: Maybe<Scalars['Int']>;
  active_participant?: Maybe<Scalars['Int']>;
  participant?: Maybe<Scalars['Int']>;
  occasional_participant?: Maybe<Scalars['Int']>;
  least_engaged?: Maybe<Scalars['Int']>;
};

export type Community = {
  __typename?: 'Community';
  uuid: Scalars['ID'];
  accountId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  selections?: Maybe<Scalars['JSON']>;
  criteriaFilters?: Maybe<Scalars['JSON']>;
  geoFilters?: Maybe<Scalars['JSON']>;
  status?: Maybe<Status>;
};

export type CommunityAttributes = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  selections?: Maybe<Scalars['JSON']>;
  criteriaFilters?: Maybe<Scalars['JSON']>;
  geoFilters?: Maybe<Scalars['JSON']>;
};

export type CommunityInput = {
  uuid?: Maybe<Scalars['ID']>;
  accountId?: Maybe<Scalars['ID']>;
  communityAttr?: Maybe<CommunityAttributes>;
};

export type CommunityList = {
  __typename?: 'CommunityList';
  uuid: Scalars['ID'];
  accountId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
};

export type CommunityListExplorerData = {
  __typename?: 'CommunityListExplorerData';
  totals?: Maybe<Total>;
  indicators?: Maybe<Indicators>;
};

export type CommunityListInput = {
  uuid?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['StringOrList']>;
  accountId?: Maybe<Scalars['ID']>;
  status?: Maybe<Status>;
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

export type CreateOrganizationHostnameInput = {
  hostname: Scalars['String'];
  organizationUuid: Scalars['ID'];
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

export type Datapoint = {
  __typename?: 'Datapoint';
  total?: Maybe<Scalars['String']>;
  civic_score?: Maybe<Scalars['Float']>;
  models?: Maybe<Models>;
};


export type DegreeCategories = {
  __typename?: 'DegreeCategories';
  less_than_high_school?: Maybe<Datapoint>;
  high_school?: Maybe<Datapoint>;
  some_college?: Maybe<Datapoint>;
  bachelors?: Maybe<Datapoint>;
  graduate?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
};

export type DeleteFormInput = {
  uuid: Scalars['UUID'];
};

export type DeleteFormPayload = {
  __typename?: 'DeleteFormPayload';
  uuid: Scalars['UUID'];
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

export type Explorer = {
  __typename?: 'Explorer';
  segment?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  congress?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  totals?: Maybe<Total>;
  indicators?: Maybe<Indicators>;
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

export type GenderCategories = {
  __typename?: 'GenderCategories';
  male?: Maybe<Datapoint>;
  female?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
};

export type IncomeCategories = {
  __typename?: 'IncomeCategories';
  c_30k_or_less?: Maybe<Datapoint>;
  c_30_to_50k?: Maybe<Datapoint>;
  c_50_to_75k?: Maybe<Datapoint>;
  c_75_to_125k?: Maybe<Datapoint>;
  c_125k_plus?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
};

export type Indicators = {
  __typename?: 'Indicators';
  age?: Maybe<AgeCategories>;
  gender?: Maybe<GenderCategories>;
  income?: Maybe<IncomeCategories>;
  degree?: Maybe<DegreeCategories>;
  marital?: Maybe<MaritalCategories>;
};

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


export type MaritalCategories = {
  __typename?: 'MaritalCategories';
  male_married?: Maybe<Datapoint>;
  female_married?: Maybe<Datapoint>;
  male_non_traditional?: Maybe<Datapoint>;
  female_non_traditional?: Maybe<Datapoint>;
  male_unknown?: Maybe<Datapoint>;
  female_unknown?: Maybe<Datapoint>;
};

export type Models = {
  __typename?: 'Models';
  civic_scores?: Maybe<CivicModel>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSample?: Maybe<SampleMutationObject>;
  createForm: CreateFormPayload;
  deleteForm: DeleteFormPayload;
  createAccount?: Maybe<Account>;
  createCommunity?: Maybe<Community>;
  deleteCommunity?: Maybe<Scalars['String']>;
  updateCommunity?: Maybe<Community>;
  createCommunityList?: Maybe<CommunityList>;
  deleteCommunityList?: Maybe<CommunityList>;
  updateCommunityList?: Maybe<CommunityList>;
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


export type MutationCreateSampleArgs = {
  uuid: Scalars['ID'];
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};


export type MutationDeleteFormArgs = {
  input: DeleteFormInput;
};


export type MutationCreateAccountArgs = {
  accountInput?: Maybe<AccountInput>;
};


export type MutationCreateCommunityArgs = {
  input?: Maybe<CommunityInput>;
};


export type MutationDeleteCommunityArgs = {
  input?: Maybe<CommunityInput>;
};


export type MutationUpdateCommunityArgs = {
  input?: Maybe<CommunityInput>;
};


export type MutationCreateCommunityListArgs = {
  communityListInput?: Maybe<CommunityListInput>;
};


export type MutationDeleteCommunityListArgs = {
  communityListInput?: Maybe<CommunityListInput>;
};


export type MutationUpdateCommunityListArgs = {
  communityListInput?: Maybe<CommunityListInput>;
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
  sample2?: Maybe<Sample2QueryObject>;
  samples2?: Maybe<Array<Maybe<Sample2QueryObject>>>;
  sample?: Maybe<SampleQueryObject>;
  samples?: Maybe<Array<Maybe<SampleQueryObject>>>;
  form?: Maybe<Form>;
  forms: Array<Form>;
  listAccounts?: Maybe<Array<Maybe<Account>>>;
  getAccount?: Maybe<Account>;
  listCommunities?: Maybe<Array<Maybe<Community>>>;
  getCommunity?: Maybe<Community>;
  listCommunityLists?: Maybe<Array<Maybe<CommunityList>>>;
  getCommunityList?: Maybe<CommunityList>;
  getCommunityListExplorerData?: Maybe<CommunityListExplorerData>;
  getIntercomHash?: Maybe<Scalars['String']>;
  runMigration?: Maybe<Scalars['String']>;
  search?: Maybe<Array<Maybe<Search>>>;
  explorer?: Maybe<Array<Maybe<Explorer>>>;
  migrate?: Maybe<Scalars['String']>;
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
};


export type QuerySample2Args = {
  uuid: Scalars['ID'];
};


export type QuerySamples2Args = {
  organizationUuid: Scalars['ID'];
};


export type QuerySampleArgs = {
  uuid: Scalars['ID'];
};


export type QuerySamplesArgs = {
  organizationUuid: Scalars['ID'];
};


export type QueryFormArgs = {
  uuid: Scalars['UUID'];
};


export type QueryFormsArgs = {
  organizationUuid: Scalars['UUID'];
};


export type QueryListAccountsArgs = {
  accountIds?: Maybe<Array<Scalars['ID']>>;
};


export type QueryGetAccountArgs = {
  accountId: Scalars['ID'];
};


export type QueryListCommunitiesArgs = {
  accountId: Scalars['ID'];
};


export type QueryGetCommunityArgs = {
  accountId: Scalars['ID'];
  uuid: Scalars['ID'];
};


export type QueryListCommunityListsArgs = {
  accountId: Scalars['ID'];
};


export type QueryGetCommunityListArgs = {
  accountId: Scalars['ID'];
  uuid: Scalars['ID'];
};


export type QueryGetCommunityListExplorerDataArgs = {
  uuid: Scalars['ID'];
};


export type QueryGetIntercomHashArgs = {
  email?: Maybe<Scalars['String']>;
};


export type QueryRunMigrationArgs = {
  seed?: Maybe<Scalars['Boolean']>;
  reset?: Maybe<Scalars['Boolean']>;
};


export type QuerySearchArgs = {
  input?: Maybe<SearchInput>;
};


export type QueryExplorerArgs = {
  level?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['StringOrList']>;
  include?: Maybe<Scalars['StringOrList']>;
  exclude?: Maybe<Scalars['StringOrList']>;
};


export type QueryMigrateArgs = {
  flush?: Maybe<Scalars['Boolean']>;
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
  organizationUuid: Scalars['ID'];
  domainType?: Maybe<DomainTypeEnum>;
};

export type ResetUserPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type Sample2QueryObject = {
  __typename?: 'Sample2QueryObject';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type SampleMutationObject = {
  __typename?: 'SampleMutationObject';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type SampleQueryObject = {
  __typename?: 'SampleQueryObject';
  uuid: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
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

export type Search = {
  __typename?: 'Search';
  label?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
};

export type SearchInput = {
  term?: Maybe<Scalars['String']>;
};

export enum Status {
  Deleted = 'DELETED',
  Blocked = 'BLOCKED',
  Suspended = 'SUSPENDED',
  Pending = 'PENDING',
  Active = 'ACTIVE'
}

export enum StatusEnum {
  Deleted = 'DELETED',
  Blocked = 'BLOCKED',
  Suspended = 'SUSPENDED',
  Pending = 'PENDING',
  Active = 'ACTIVE'
}


export enum SubscriptionEnum {
  Explorer = 'EXPLORER',
  Starter = 'STARTER',
  Basic = 'BASIC',
  Premium = 'PREMIUM',
  Enterprise = 'ENTERPRISE'
}

export type Total = {
  __typename?: 'Total';
  people?: Maybe<Scalars['Int']>;
  households?: Maybe<Scalars['Int']>;
  civic_score?: Maybe<Scalars['Float']>;
};


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