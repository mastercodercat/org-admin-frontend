import { createSelector } from '@ngrx/store';
import * as fromUserSelectors from '../selectors/user.selectors';
import * as fromUser from '../reducers/user.reducer';
import * as fromLoginSelectors from '../../login/store/selectors/login.selectors';
import * as fromLogin from '../../login/store/reducers/login.reducer';

export const selectLoginOrgSuccess = createSelector(fromLoginSelectors.selectLoginState, fromUserSelectors.selectUserState,
  (loginState: fromLogin.LoginState, userState: fromUser.UserState) => loginState.success && userState.addOrgsSuccess);
