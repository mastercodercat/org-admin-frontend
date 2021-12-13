import {
  Spectator,
  createComponentFactory,
  byPlaceholder,
  createRoutingFactory,
} from '@ngneat/spectator';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { RequestSentComponent } from './request-sent.component';

describe('RequestSentComponent', () => {
  let spectator: Spectator<RequestSentComponent>;
  const createComponent = createComponentFactory({
    component: RequestSentComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      StoreModule.forRoot(reducers, { metaReducers }),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should display ui', () => {
    expect(spectator.query('h1')).toHaveExactText(
      'Reset password instructions sent'
    );
    expect(spectator.query('p')).toHaveExactText(
      'An email has been sent over with instructions to reset your password. Please check your email.'
    );
  });
});
