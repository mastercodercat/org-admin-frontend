import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

// import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { reducers, metaReducers } from '../../store/reducers';

describe('UserService', () => {
  let spectator: SpectatorService<UserService>;
  const createService = createServiceFactory({
    service: UserService,
    imports: [
      RouterTestingModule,
      StoreModule.forRoot(reducers, { metaReducers }),
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
