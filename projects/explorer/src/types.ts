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

export type CivicModel = {
  __typename?: 'CivicModel';
  most_engaged?: Maybe<Scalars['Int']>;
  active_participant?: Maybe<Scalars['Int']>;
  participant?: Maybe<Scalars['Int']>;
  occasional_participant?: Maybe<Scalars['Int']>;
  least_engaged?: Maybe<Scalars['Int']>;
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
};

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

export type RootQueryType = {
  __typename?: 'RootQueryType';
  cache?: Maybe<Scalars['String']>;
  explorer?: Maybe<Array<Maybe<Segment>>>;
};


export type RootQueryTypeCacheArgs = {
  flush?: Maybe<Scalars['Boolean']>;
};


export type RootQueryTypeExplorerArgs = {
  level?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
};

export type Segment = {
  __typename?: 'Segment';
  segment?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  totals?: Maybe<Total>;
  indicators?: Maybe<Indicators>;
};

export type Total = {
  __typename?: 'Total';
  people?: Maybe<Scalars['Int']>;
  households?: Maybe<Scalars['Int']>;
  civic_score?: Maybe<Scalars['Float']>;
};
