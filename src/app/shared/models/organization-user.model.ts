import { Organization } from './organization.model';
import { Role } from './role.model';
import { User } from './user.model';

export interface OrganizationUser extends User {
  organization: Organization;
  organizationUuid: string;
  title: string;
  role: Role;
}
