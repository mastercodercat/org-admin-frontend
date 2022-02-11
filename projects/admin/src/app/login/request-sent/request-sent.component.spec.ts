import {
  Spectator,
  createComponentFactory,
} from '@ngneat/spectator';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { reducers, metaReducers } from '../../../../../../src/app/store/reducers';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MailOutline, UserOutline } from '@ant-design/icons-angular/icons';

import { RequestSentComponent } from './request-sent.component';

const icons: IconDefinition[] = [MailOutline, UserOutline];

describe('RequestSentComponent', () => {
  let spectator: Spectator<RequestSentComponent>;
  const createComponent = createComponentFactory({
    component: RequestSentComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should display ui', () => {
    expect(spectator.query('h1')).toHaveExactText(
      'Reset password instructions sent',
    );
    expect(spectator.query('p')).toHaveExactText(
      'An email has been sent over with instructions to reset your password. Please check your email.',
    );
  });
});
