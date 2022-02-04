import { createAction, props } from '@ngrx/store';
import { LoginErrorResponse } from '../../models/login-error-response.model';

export const loginSuccess = createAction('[Login] Login success');

export const loginFailure = createAction(
  '[Login] Login failure',
  props<{ error: LoginErrorResponse }>(),
);
