import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Domain } from '../../components/landing-page-domains/domain.model';
import * as fromActions from '../actions/domains.actions';
import { DomainsService } from '../../services/domains.service';


@Injectable()
export class DomainsEffects {

  loadDomains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadDomains),
      switchMap(() => this.domainsService.loadLandingPageDomains()
        .pipe(
          map(result => fromActions.loadDomainsSuccess({ domains: result.data.organizationHostnames as Domain[] })),
          catchError(err => of(fromActions.loadDomainsFailure({ error: err }))),
        ),
      ),
    ),
  );

  deleteDomain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteDomain),
      switchMap(({uuid}) => this.domainsService.deleteDomain(uuid)
        .pipe(
          map(result => fromActions.deleteDomainSuccess({ uuid: result.data?.deleteOrganizationHostname?.uuid || '' })),
          catchError(err => of(fromActions.deleteDomainFailure({ error: err }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private domainsService: DomainsService) {}

}
