import {
  Spectator,
  createComponentFactory,
} from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.component).toBeTruthy();
  });
});
