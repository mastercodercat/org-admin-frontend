import { Organization } from '../../../../../../../../src/app/shared/models/organization.model';
import { Role } from '../../../../../../../../src/app/shared/models/role.model';

export interface Member {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  organizationUsers: {
    title: string;
    role: Role;
    organization: Organization;
  }[];
}
