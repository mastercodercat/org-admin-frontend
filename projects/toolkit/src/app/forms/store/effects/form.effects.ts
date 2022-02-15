import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import { Apollo, QueryRef, gql } from 'apollo-angular';

import * as fromActions from '../actions/form.actions';
import { Form } from '../../models/form.model';
import { FormService } from '../../services/form.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class FormEffects {
  constructor(private actions$: Actions, private formService: FormService) {}

  requestLoadForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadForms),
      switchMap(() => this.formService.loadForms().pipe(
        map(result => fromActions.loadFormsSuccess({ data: result.data.forms as Form[] })),
      )),
    ),
  );
  

}
