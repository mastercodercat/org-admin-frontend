import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ExplorerGeoFilterActions from './explorer-geo-filter.actions';



@Injectable()
export class ExplorerGeoFilterEffects {

  // loadExplorerGeoFilters$ = createEffect(() => {
  //   return this.actions$.pipe(
  //
  //     ofType(ExplorerGeoFilterActions.loadExplorerGeoFilters),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ExplorerGeoFilterActions.loadExplorerGeoFiltersSuccess({ data })),
  //         catchError(error => of(ExplorerGeoFilterActions.loadExplorerGeoFiltersFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
