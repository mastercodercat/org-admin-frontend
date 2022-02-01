import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';

import { UserEffects } from './user.effects';
import { reducers, metaReducers } from '../reducers';
import { StoreModule } from '@ngrx/store';

describe('UserEffects', () => {
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, Actions],
      imports: [StoreModule.forRoot(reducers, { metaReducers })],
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
