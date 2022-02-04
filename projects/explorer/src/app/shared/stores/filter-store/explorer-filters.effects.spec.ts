import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExplorerFiltersEffects } from './explorer-filters.effects';

xdescribe('ExplorerFiltersEffects', () => {
  let actions$: Observable<any>;
  let effects: ExplorerFiltersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExplorerFiltersEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(ExplorerFiltersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
