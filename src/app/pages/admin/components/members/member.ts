
export interface Organization {
  uuid: string;
  name: string;
}
export interface Role {
  uuid: string;
  name: string;
}
export interface OrganizationUsers {
  organization: Organization;
  role: Role;
}

export class Member {
  uuid: string = '';
  name: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '' ;
  phone?: string | undefined ;
  avatar?: string | undefined ;
  position: string = '';
  organizationUsers: OrganizationUsers[] = [];
}
