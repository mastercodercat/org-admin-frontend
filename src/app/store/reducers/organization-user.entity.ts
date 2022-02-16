import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { OrganizationUser } from '../../shared/models/organization-user.model';

export type OrganizationUserState = EntityState<OrganizationUser>;

export const organizationUserAdapter: EntityAdapter<OrganizationUser> = createEntityAdapter<OrganizationUser>({
  selectId: (user: OrganizationUser) => user.uuid,
});
