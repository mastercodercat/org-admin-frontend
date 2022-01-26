import { Organization } from '../../../../shared/models/organization.model';
import { Role } from '../../../../shared/models/role.model';
import { User } from '../../../../shared/models/user.model';

export interface OrganizationUsers extends User {
  organization: Organization;
  role: Role;
  organizationUuid: string;
}

export interface Member {
  uuid: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  position: string;
  organizationUsers: Partial<OrganizationUsers>[];
}
