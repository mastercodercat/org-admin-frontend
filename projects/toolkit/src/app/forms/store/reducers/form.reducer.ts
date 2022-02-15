import { Action, createReducer, on } from '@ngrx/store';
import { Form } from '../../models/form.model';
// import { errorMonitor } from 'events';
import * as fromActions from '../actions/form.actions';


export const formFeatureKey = 'form';

export interface FormState {
  forms: Form[];
  loading: boolean;
  /* error: any; */
}

export const initialState: FormState = {
  forms: [],
  loading: false,
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
    /* error: error, // add later */
  })),


);

