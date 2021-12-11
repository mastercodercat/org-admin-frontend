import { Auth0UserProfile } from 'auth0-js';
import { Organization } from './organization.model';

export interface User extends Auth0UserProfile {
  uuid?: string; // Users uuid
  selectedOrganizationUuid?: string;
}