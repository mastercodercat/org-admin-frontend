import { OrganizationEnumType, SubscriptionEnumType } from 'src/app/shared/services/graphql/graphql.service';

export interface Organization {
  name: string;
  type?: OrganizationEnumType;
  subscriptionType?: SubscriptionEnumType;
  uuid: string;
  parentOrgUuid: string;
}