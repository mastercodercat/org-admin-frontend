import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Organization } from '../../shared/models/organization.model';
import { StatusEnum } from '../../../../projects/admin/src/app/shared/services/graphql/graphql.service';
import * as fromUser from '../reducers/user.reducer';
import { OrganizationUser } from '../../shared/models/organization-user.model';
import { Role } from '../../shared/models/role.model';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey,
);

/** Organization entity selectors */
export const selectOrganizationsState = createSelector(selectUserState, (user: fromUser.UserState) => user.organizations);
export const selectAllOrganizationEntities = createSelector(selectOrganizationsState, fromUser.selectOrganizationEntities);
export const selectAllOrganizations = createSelector(selectOrganizationsState, fromUser.selectAllOrganizations);
export const selectOrganizationsCount = createSelector(selectOrganizationsState, fromUser.selectTotalOrganizations);

/** Organization users entity selectors */
export const selectOrganizationUserState = createSelector(selectUserState, (user: fromUser.UserState) => user.organizationUsers);
export const selectAllOrganizationUserEntities = createSelector(selectOrganizationUserState, fromUser.selectOrganizationUserEntities);
export const selectAllOrganizationUsers = createSelector(selectOrganizationUserState, fromUser.selectAllOrganizationUsers);
export const selectOrganizationUsersCount = createSelector(selectOrganizationUserState, fromUser.selectTotalOrganizationUsers);

/** User selectors */
export const selectUser = createSelector(selectUserState, (user: fromUser.UserState) => user);
export const selectCurrentOrganizationUuid = createSelector(selectUserState, (user: fromUser.UserState) => user.selectedOrganizationUuid);
export const selectCurrentOrganization = createSelector(selectUserState, selectAllOrganizationEntities,
  (user: fromUser.UserState, orgs: Dictionary<Organization>) => orgs[user.selectedOrganizationUuid]);

export const selectActivePendingOrganizations = createSelector(selectAllOrganizations,
  (orgs: Organization[]) => orgs.filter(org => org.status === StatusEnum.Active || org.status === StatusEnum.Pending));

export const selectOrganizationByUuid = (orgUuid: string): MemoizedSelector<object, Organization | undefined> =>
  createSelector(selectAllOrganizationEntities, (orgs: Dictionary<Organization>) => orgs[orgUuid]);

export const selectUserRole = createSelector(selectCurrentOrganizationUuid, selectAllOrganizationUsers,
  (currentOrgUuid: string, orgUsers: OrganizationUser[]) =>
    orgUsers.filter(orgUser => currentOrgUuid === orgUser.organizationUuid)[0]?.role);

export const selectIsAdmin = createSelector(selectUserRole, (role: Role) => role?.name === 'Admin');
export const selectIsAdminOrUser = createSelector(selectUserRole, (role: Role) => role?.name === 'Admin' || role?.name === 'User');
// Check if the current organization is the helm organization by checking for a parent organization uuid
// Also check that the user is an admin
export const selectIsHelmAdmin = createSelector(selectCurrentOrganization, selectIsAdmin,
  (currOrg: Organization | undefined, isAdmin: boolean) => !currOrg?.organizationUuid && isAdmin);
