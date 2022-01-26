import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { JoinComponent } from './join.component';
import { FormBuilder } from '@angular/forms';

describe('JoinComponent', () => {
  let spectator: Spectator<JoinComponent>;
  const createComponent = createComponentFactory({
    component: JoinComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      HttpClientModule,
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
