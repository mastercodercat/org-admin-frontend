import { createAction, props } from '@ngrx/store';
import { Form } from '../../models/form.model';

export const loadForms = createAction(
  '[Form] Load Forms',
);

export const loadFormsSuccess = createAction(
  '[Form] Load Forms Success',
  props<{ data: any }>(),
);

export const loadFormsFailure = createAction(
  '[Form] Load Forms Failure',
  props<{ error: any }>(),
);

export const createForm = createAction(
  '[Form] Create Form',
  props<{ form: Form }>(),
);

export const createFormSuccess = createAction(
  '[Form] Create Form Success',
  props<{ data: Form }>(),
);

export const createFormFailure = createAction(
  '[Form] Create Form Failure',
  props<{ error: any }>(),
);

export const clearInsertedForm = createAction(
  '[Form] Clear Inserted Form',
);
