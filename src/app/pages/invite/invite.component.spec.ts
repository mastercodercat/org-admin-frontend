import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../store/reducers';

import { InviteComponent } from './invite.component';

describe('InviteComponent', () => {
  let spectator: Spectator<InviteComponent>;
  const createComponent = createComponentFactory({
    component: InviteComponent,
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
    expect(spectator.query(byText('Choose method'))).toExist();
    expect(spectator.query(byText('Exit'))).toExist();
  });
});
