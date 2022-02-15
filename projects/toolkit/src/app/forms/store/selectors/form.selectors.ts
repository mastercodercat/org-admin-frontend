import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromForm from '../reducers/form.reducer';

export const selectFormState = createFeatureSelector<fromForm.FormState>(
  fromForm.formFeatureKey,
);

export const selectForms = createSelector(
  selectFormState,
  (formState: fromForm.FormState) => formState.forms,
);

