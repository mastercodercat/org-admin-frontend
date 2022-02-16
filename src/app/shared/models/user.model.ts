import { StatusEnum } from '../../../../projects/admin/src/app/shared/services/graphql/graphql.service';

export interface User {
  uuid: string;
  email: string;
  selectedOrganizationUuid: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  status?: StatusEnum;
}
