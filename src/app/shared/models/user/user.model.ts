import { Auth0UserProfile } from 'auth0-js';
import { Organization } from 'src/app/pages/organization/shared/organization.model';

export interface User extends Auth0UserProfile {
  uuid?: string; // Users uuid
  selectedOrganization?: Organization; // TODO: Change to organization uuid to tie to entity
  organizations?: Organization[]; // TODO: Change to entity to be an array of organization Uuid's
}