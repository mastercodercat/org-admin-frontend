import { OrganizationEnum, SubscriptionEnum } from 'src/app/shared/services/graphql/graphql.service';

export interface Organization {
  name: string;
  type?: OrganizationEnum;
  subscriptionType?: SubscriptionEnum;
  uuid: string; // Organization uuid
  organizationUuid?: string; // Parent organization uuid
}
