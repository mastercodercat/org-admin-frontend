import { StatusEnum } from '../../../../shared/services/graphql/graphql.service';

export interface Domain {
  uuid: string;
  createdAt: string;
  status: StatusEnum;
  hostname: string;
  user?: {
    firstName?: string;
    lastName?: string;
  };
}
