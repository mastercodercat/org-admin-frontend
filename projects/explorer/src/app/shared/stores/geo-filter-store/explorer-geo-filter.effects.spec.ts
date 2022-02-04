import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExplorerGeoFilterEffects } from './explorer-geo-filter.effects';

xdescribe('ExplorerGeoFilterEffects', () => {
  let actions$: Observable<any>;
  let effects: ExplorerGeoFilterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExplorerGeoFilterEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(ExplorerGeoFilterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
