import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExplorerEffects } from './explorer.effects';

xdescribe('ExplorerEffects', () => {
  let actions$: Observable<any>;
  let effects: ExplorerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExplorerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ExplorerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
