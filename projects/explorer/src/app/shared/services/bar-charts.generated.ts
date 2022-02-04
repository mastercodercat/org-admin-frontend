import * as Types from '../../../types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}



export interface AgeCategories {
  __typename?: 'AgeCategories';
  c_18_to_24?: Maybe<Datapoint>;
  c_25_to_34?: Maybe<Datapoint>;
  c_35_to_44?: Maybe<Datapoint>;
  c_45_to_54?: Maybe<Datapoint>;
  c_55_to_64?: Maybe<Datapoint>;
  c_65_plus?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
}

export interface CivicModel {
  __typename?: 'CivicModel';
  most_engaged?: Maybe<Scalars['Int']>;
  active_participant?: Maybe<Scalars['Int']>;
  participant?: Maybe<Scalars['Int']>;
  occasional_participant?: Maybe<Scalars['Int']>;
  least_engaged?: Maybe<Scalars['Int']>;
}

export interface Datapoint {
  __typename?: 'Datapoint';
  total?: Maybe<Scalars['String']>;
  civic_score?: Maybe<Scalars['Float']>;
  models?: Maybe<Models>;
}

export interface DegreeCategories {
  __typename?: 'DegreeCategories';
  less_than_high_school?: Maybe<Datapoint>;
  high_school?: Maybe<Datapoint>;
  some_college?: Maybe<Datapoint>;
  bachelors?: Maybe<Datapoint>;
  graduate?: Maybe<Datapoint>;
}

export interface GenderCategories {
  __typename?: 'GenderCategories';
  male?: Maybe<Datapoint>;
  female?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
}

export interface IncomeCategories {
  __typename?: 'IncomeCategories';
  c_30k_or_less?: Maybe<Datapoint>;
  c_30_to_50k?: Maybe<Datapoint>;
  c_50_to_75k?: Maybe<Datapoint>;
  c_75_to_125k?: Maybe<Datapoint>;
  c_125k_plus?: Maybe<Datapoint>;
  unknown?: Maybe<Datapoint>;
}

export interface Indicators {
  __typename?: 'Indicators';
  age?: Maybe<AgeCategories>;
  gender?: Maybe<GenderCategories>;
  income?: Maybe<IncomeCategories>;
  degree?: Maybe<DegreeCategories>;
  marital?: Maybe<MaritalCategories>;
}

export interface MaritalCategories {
  __typename?: 'MaritalCategories';
  male_married?: Maybe<Datapoint>;
  female_married?: Maybe<Datapoint>;
  male_non_traditional?: Maybe<Datapoint>;
  female_non_traditional?: Maybe<Datapoint>;
  male_unknown?: Maybe<Datapoint>;
  female_unknown?: Maybe<Datapoint>;
}

export interface Models {
  __typename?: 'Models';
  civic_scores?: Maybe<CivicModel>;
}

export interface RootQueryType {
  __typename?: 'RootQueryType';
  cache?: Maybe<Scalars['String']>;
  explorer?: Maybe<Array<Maybe<Segment>>>;
}


export interface RootQueryTypeCacheArgs {
  flush?: Maybe<Scalars['Boolean']>;
}


export interface RootQueryTypeExplorerArgs {
  level?: Maybe<Scalars['String']>;
  segment?: Maybe<Scalars['String']>;
}

export interface Segment {
  __typename?: 'Segment';
  segment?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  totals?: Maybe<Total>;
  indicators?: Maybe<Indicators>;
}

export interface Total {
  __typename?: 'Total';
  people?: Maybe<Scalars['Int']>;
  households?: Maybe<Scalars['Int']>;
  civic_score?: Maybe<Scalars['Float']>;
}

export type ChartDataQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.Scalars['String']>;
}>;


export type ChartDataQuery = (
  { __typename?: 'RootQueryType' }
  & { national?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Segment' }
    & Pick<Types.Segment, 'segment' | 'state' | 'county'>
    & { totals?: Types.Maybe<(
      { __typename?: 'Total' }
      & Pick<Types.Total, 'people' | 'households' | 'civic_score'>
    )>, indicators?: Types.Maybe<(
      { __typename?: 'Indicators' }
      & { gender?: Types.Maybe<(
        { __typename?: 'GenderCategories' }
        & { male?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, female?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )> }
      )>, age?: Types.Maybe<(
        { __typename?: 'AgeCategories' }
        & { c_65_plus?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_55_to_64?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_45_to_54?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_35_to_44?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_25_to_34?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_18_to_24?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )> }
      )>, degree?: Types.Maybe<(
        { __typename?: 'DegreeCategories' }
        & { graduate?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, bachelors?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, some_college?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, high_school?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, less_than_high_school?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )> }
      )>, income?: Types.Maybe<(
        { __typename?: 'IncomeCategories' }
        & { c_125k_plus?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_75_to_125k?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_50_to_75k?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_30_to_50k?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )>, c_30k_or_less?: Types.Maybe<(
          { __typename?: 'Datapoint' }
          & Pick<Types.Datapoint, 'total' | 'civic_score'>
          & { models?: Types.Maybe<(
            { __typename?: 'Models' }
            & { civic_scores?: Types.Maybe<(
              { __typename?: 'CivicModel' }
              & Pick<Types.CivicModel, 'most_engaged' | 'active_participant' | 'participant' | 'occasional_participant' | 'least_engaged'>
            )> }
          )> }
        )> }
      )> }
    )> }
  )>>> }
);

export const ChartDataDocument = gql`
    query chartData {
  county: explorer(level: "county", segment: "US-VA-630") {
    segment
    state
    county
    totals {
      people
      households
      civic_score
    }
    indicators {
      gender {
        male {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        female {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
      }
      age {
        c_65_plus {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_55_to_64 {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_45_to_54 {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_35_to_44 {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_25_to_34 {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_18_to_24 {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
      }
      degree {
        graduate {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        bachelors {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        some_college {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        high_school {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        less_than_high_school {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
      }
      income {
        c_125k_plus {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_75_to_125k {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_50_to_75k {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_30_to_50k {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
            }
          }
        }
        c_30k_or_less {
          total
          civic_score
          models {
            civic_scores {
              most_engaged
              active_participant
              participant
              occasional_participant
              least_engaged
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
export class ChartDataGQL extends Apollo.Query<ChartDataQuery, ChartDataQueryVariables> {
  document = ChartDataDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
