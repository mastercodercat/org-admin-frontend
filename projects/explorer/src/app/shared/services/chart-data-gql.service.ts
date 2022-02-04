import { Injectable } from '@angular/core';
import {gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})

export class ChartDataGqlService {
  public chartDataGQL = gql`
    query chartData($level: String, $segment: StringOrList, $include: StringOrList ) {
  county: explorer(level: $level, segment: $segment, include: $include) {
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
        unknown {
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
        unknown {
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
        unknown {
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
        unknown {
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

  public chartDataNational = gql`
    query chartData($include: StringOrList) {
  county: explorer(include: $include) {
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
        unknown {
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
        unknown {
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
        unknown {
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
        unknown {
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

  public stateData = gql`
  query chartData {
    states:explorer (level: "state") {
      segment
      state
      county
      totals {
        people
        households
        civic_score
      }
    }
  }
    `;

  public countyData = gql`
  query chartData ($segment: StringOrList){
    county:explorer (level: "county", segment: $segment) {
      segment
      state
      county
      totals {
        people
        households
        civic_score
      }
    }
  }
    `;

  public multMapData = gql`
  query chartData ($level: String, $segment: StringOrList){
    county:explorer (level: $level, segment: $segment) {
      segment
      state
      county
      congress
      postcode
      totals {
        people
        households
        civic_score
      }
    }
  }
    `;

  public searchData = gql`
  query chartData ($input: SearchInput){
    county:search (input: $input) {
      label,
      id,
      state,
      stateName,
      level
    }
  }
    `;

  constructor() { }
}
