import { Form } from '../../../forms/models/form.model';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromForm from '../reducers/form.reducer';

export const selectFormState = createFeatureSelector<fromForm.FormState>(
  fromForm.formFeatureKey,
);

export const selectForms = createSelector(
  selectFormState,
  (formState: fromForm.FormState) => formState.forms,
);

export const selectFormsSortedByCreation = createSelector(
  selectForms,
  (forms: Form[]) => {
    return [...forms].sort( (a: Form, b: Form) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
  }
);
