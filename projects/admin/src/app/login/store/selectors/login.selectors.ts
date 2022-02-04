import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from '../../store/reducers/login.reducer';

export const selectLoginState = createFeatureSelector<fromLogin.LoginState>(
  fromLogin.loginFeatureKey,
);

export const selectLoginSuccess = createSelector(selectLoginState, (state: fromLogin.LoginState) => state.success);

export const selectLoginFailure = createSelector(selectLoginState, (state: fromLogin.LoginState) =>
  ({ failure: state.failure, error: state.error }));
