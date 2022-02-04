import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ExplorerActions from './explorer.actions';
import { MapService } from '../../services/map.service';



@Injectable()
export class ExplorerEffects {

  loadStates$ = createEffect(() => this.actions$.pipe(
    ofType(ExplorerActions.loadExplorersStates),
    mergeMap(() => this.mapservice.getStateData().pipe(
      map(states => ExplorerActions.loadExplorersStatesSuccess({states})),
      catchError(error => of(ExplorerActions.loadExplorersStatesFailure(error))),
    )),
  ),
  );


  constructor(private actions$: Actions, private mapservice: MapService) {}

}
