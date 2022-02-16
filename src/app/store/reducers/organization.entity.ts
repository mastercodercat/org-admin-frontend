import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Organization } from '../../shared/models/organization.model';

export type OrganizationState = EntityState<Organization>;

export const organizationAdapter: EntityAdapter<Organization> = createEntityAdapter<Organization>({
  selectId: (org: Organization) => org.uuid,
});
