import { OrganizationUsers } from '../../pages/admin/components/members/member';
import { StatusEnum } from '../services/graphql/graphql.service';

export interface User {
  uuid?: string; // Users uuid
  email: string;
  name: string;
  picture: string;
  nickname: string;
  selectedOrganizationUuid?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  title?: string;
  status?: StatusEnum;
  organizationUsers?: OrganizationUsers[];
}
