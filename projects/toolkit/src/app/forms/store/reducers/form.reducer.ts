import { Action, createReducer, on } from '@ngrx/store';
import { Form } from '../../models/form.model';
// import { errorMonitor } from 'events';
import * as fromActions from '../actions/form.actions';


export const formFeatureKey = 'form';

export interface FormState {
  forms: Form[];
  loading: boolean;
  insertedForm?: Form;
  error: string;
}

export const initialState: FormState = {
  forms: [],
  loading: false,
  error: '',
};


export const formReducer = createReducer(
  initialState,

  on(fromActions.loadForms, state => ({
    ...state,
    loading: true,
  })),

  on(fromActions.loadFormsSuccess, (state, { data }) => ({
    ...state,
    forms: data,
    loading: false,
  })),

  on(fromActions.loadFormsFailure, (state, { error }) => ({
    ...state,
    loading: false,
  })),

  on(fromActions.createForm, state => ({
    ...state,
    loading: true,
    error: '',
  })),

  on(fromActions.createFormSuccess, (state, { data }) => ({
    ...state,
    forms: [...state.forms, data],
    loading: false,
    insertedForm: data,
    error: '',
  })),

  on(fromActions.createFormFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(fromActions.clearInsertedForm, state => ({
    ...state,
    insertedForm: undefined,
  })),

);

