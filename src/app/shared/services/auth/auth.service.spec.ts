import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { AuthService } from './auth.service';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { StoreModule } from '@ngrx/store';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    imports: [StoreModule.forRoot(reducers, { metaReducers })],
  });

  beforeEach(() => (spectator = createService()));

  it('should not be authenticated', () => {
    expect(spectator.service.isAuthenticated()).toBeFalsy();
  });
});
