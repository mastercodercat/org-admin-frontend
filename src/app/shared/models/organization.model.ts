import { OrganizationEnum, StatusEnum, SubscriptionEnum } from '../../../../projects/admin/src/app/shared/services/graphql/graphql.service';
import { Role } from './role.model';

export interface Organization {
  name: string;
  type?: OrganizationEnum;
  subscriptionType?: SubscriptionEnum;
  uuid: string; // Organization uuid
  organizationUuid?: string; // Parent organization uuid
  roles: Role[];
  countUsers?: number;
  organizations?: Organization[];
  status: StatusEnum;
}
