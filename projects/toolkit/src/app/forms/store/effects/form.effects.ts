import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import * as fromActions from '../actions/form.actions';
import { Form } from '../../models/form.model';
import { FormService } from '../../services/form.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FormEffects {

  requestLoadForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadForms),
      switchMap(() => this.formService.loadForms().pipe(
        map(result => fromActions.loadFormsSuccess({ data: result.data.forms as Form[] })),
      )),
    ),
  );

  requestCreateForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createForm),
      switchMap(action => this.formService.createForms(action.form).pipe(
        map(result => fromActions.createFormSuccess({ data: result.data?.createForm.form as Form })),
        catchError(err => of(fromActions.createFormFailure({ error: err.message }))),
      )),
    ),
  );

  constructor(private actions$: Actions, private formService: FormService) {}

}
