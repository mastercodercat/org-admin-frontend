import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';

// import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { reducers, metaReducers } from '../../../store/reducers';
import { StoreModule } from '@ngrx/store';
// import { Router, RouterModule } from '@angular/router';

describe('AuthGuardService', () => {
  let spectator: SpectatorService<AuthGuardService>;
  const createService = createServiceFactory({
    service: AuthGuardService,
    imports: [
      RouterTestingModule,
      StoreModule.forRoot(reducers, { metaReducers }),
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should exist', () => {
    expect(spectator.service).toBeTruthy();
  });
});
