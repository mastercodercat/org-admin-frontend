import { createReducer, on } from '@ngrx/store';
import { LoginErrorResponse } from '../../models/login-error-response.model';
import * as fromActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface LoginState {
  success: boolean;
  failure: boolean;
  error?: LoginErrorResponse;
}

export const initialState: LoginState = {
  success: false,
  failure: false,
}

export const loginReducer = createReducer(
  initialState,

  on(fromActions.loginSuccess, (state) => { 
    return {
      ...state,
      success: true,
      failure: false
    }
  }),

  on(fromActions.loginFailure, (state, {error}) => {
    return {
      ...state,
      success: false,
      failure: true,
      error
    }
  }),
);

