import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DomainsEffects } from './domains.effects';

describe('DomainsEffects', () => {
  let actions$: Observable<any>;
  let effects: DomainsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DomainsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DomainsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
