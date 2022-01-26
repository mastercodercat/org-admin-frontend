import {
  Spectator,
  createComponentFactory,
  byPlaceholder,
} from '@ngneat/spectator';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

import { RecoverPasswordComponent } from './recover-password.component';

const icons: IconDefinition[] = [UserOutline];

describe('RecoverPasswordComponent', () => {
  let spectator: Spectator<RecoverPasswordComponent>;
  const createComponent = createComponentFactory({
    component: RecoverPasswordComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should display recover password ui', () => {
    expect(spectator.query('.forgot-password-header')).toHaveExactText(
      'Forgot Password?',
    );
    expect(spectator.query('.forgot-password-msg')).toHaveExactText(
      'Enter the email address you used when you joined and we\'ll send you instructions to reset your password.',
    );
    expect(spectator.query('.password-form')).toExist();
    expect(spectator.query(byPlaceholder('Email address'))).toExist();
    expect(spectator.query('.reset-password-btn')).toHaveExactText(
      'Change Password',
    );
    expect(spectator.query('.reset-password-btn')).toBeDisabled();
  });

  it('should display validation error with invalid email', () => {
    spectator.typeInElement(
      'a',
      spectator.query(byPlaceholder('Email address')),
    );
    expect(spectator.query('.validation-error')).toHaveExactText(
      'Please enter a valid email',
    );
  });
});
