import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FormEffects } from './form.effects';

describe('FormEffects', () => {
  let actions$: Observable<any>;
  let effects: FormEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FormEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
