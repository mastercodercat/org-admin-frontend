import { Form } from '../../../forms/models/form.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForm from '../reducers/form.reducer';

export const selectFormState = createFeatureSelector<fromForm.FormState>(
  fromForm.formFeatureKey,
);

export const selectForms = createSelector(
  selectFormState,
  (formState: fromForm.FormState) => formState.forms,
);

export const selectInsertedForm = createSelector(selectFormState, (formState: fromForm.FormState) => formState.insertedForm);
export const formCreationErrors = createSelector(selectFormState, (formState: fromForm.FormState) => formState.error);
export const selectFormsSortedByCreation = createSelector(
  selectForms,
  (forms: Form[]) => [...forms].sort(
    (a: Form, b: Form) => b.createdAt && a.createdAt ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : 0),
);
