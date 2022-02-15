import { createAction, props } from '@ngrx/store';

export const loadForms = createAction(
  '[Form] Load Forms'
);

export const loadFormsSuccess = createAction(
  '[Form] Load Forms Success',
  props<{ data: any }>()
);

export const loadFormsFailure = createAction(
  '[Form] Load Forms Failure',
  props<{ error: any }>()
);
