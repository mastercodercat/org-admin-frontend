import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Organization } from '../../../../projects/admin/src/app/shared/models/organization.model';
import { StatusEnum } from '../../../../projects/admin/src/app/shared/services/graphql/graphql.service';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey,
);

export const selectAllOrganizationEntities = createSelector(selectUserState, fromUser.selectEntities);
export const selectAllOrganizations = createSelector(selectUserState, fromUser.selectAll);
export const selectOrganizationsCount = createSelector(selectUserState, fromUser.selectTotal);
export const selectUser = createSelector(selectUserState, (user: fromUser.UserState) => user);
export const selectCurrentOrganizationUuid = createSelector(selectUserState, (user: fromUser.UserState) => user.selectedOrganizationUuid);
export const selectCurrentOrganization = createSelector(selectUserState, selectAllOrganizationEntities,
  (user: fromUser.UserState, orgs: Dictionary<Organization>) => orgs[user.selectedOrganizationUuid]);

export const selectActivePendingOrganizations = createSelector(selectAllOrganizations,
  (orgs: Organization[]) => orgs.filter(org => org.status === StatusEnum.Active || org.status === StatusEnum.Pending));

export const selectOrganizationByUuid = (orgUuid: string): MemoizedSelector<object, Organization | undefined> =>
  createSelector(selectAllOrganizationEntities, (orgs: Dictionary<Organization>) => orgs[orgUuid]);

export const selectIsHelmAdmin = createSelector(selectCurrentOrganization,
  (currOrg: Organization | undefined) => {
    let isHelmAdmin = false;
    // Check if the current organization is the helm organization by checking for a parent organization uuid
    if (!currOrg?.organizationUuid) {
      isHelmAdmin = true;
    }
    return isHelmAdmin;
  });
