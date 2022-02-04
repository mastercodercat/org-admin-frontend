import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ExplorerFiltersActions from './explorer-filters.actions';



@Injectable()
export class ExplorerFiltersEffects {

  // loadExplorerFilterss$ = createEffect(() => {
  //   return this.actions$.pipe(
  //
  //     ofType(ExplorerFiltersActions.loadExplorerFilterss),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ExplorerFiltersActions.loadExplorerFilterssSuccess({ data })),
  //         catchError(error => of(ExplorerFiltersActions.loadExplorerFilterssFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
