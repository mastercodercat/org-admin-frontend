import { AppState } from '../reducers';

export const selectUser = (state: AppState) => state.user;
export const selectCurrentOrganization = (state: AppState) => state.user.selectedOrganization;
export const selectUserOrganizations = (state: AppState) => state.user.organizations;