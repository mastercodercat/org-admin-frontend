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

import { LoginComponent } from './login.component';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  const createComponent = createRoutingFactory({
    component: LoginComponent,
    declarations: [RecoverPasswordComponent],
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      StoreModule.forRoot(reducers, { metaReducers }),
    ],
    stubsEnabled: false,
    routes: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'login/recover-password',
        component: RecoverPasswordComponent,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should have login ui', () => {
    expect(spectator.query('.organizer-info')).toExist();
    expect(spectator.query('.login')).toExist();
    expect(spectator.query('.login-to-org')).toHaveExactText(
      'Log in to Organizer'
    );
    expect(spectator.query(byPlaceholder('Email address'))).toExist();
    expect(spectator.query(byPlaceholder('Password'))).toExist();
    expect(spectator.query('.view-password')).toHaveExactText('View Password');
    expect(spectator.query('.forgot-password')).toHaveExactText(
      'Forgot Password?'
    );
    expect(spectator.query('.login-btn')).toHaveExactText('Log In');
    expect(spectator.query('.login-btn')).toBeDisabled();
  });

  it('should return validation error with invalid email', () => {
    spectator.typeInElement(
      'a',
      spectator.query(byPlaceholder('Email address')) as HTMLElement
    );
    expect(spectator.query('.validation-error')).toHaveExactText(
      'Please enter a valid email'
    );
  });

  it('should not display validation error', () => {
    spectator.typeInElement(
      'angel@angel.co',
      spectator.query(byPlaceholder('Email addresss')) as HTMLElement
    );
    expect(spectator.query('.validation-error')).not.toHaveExactText(
      'Please enter a valid email'
    );
  });

  it('should go to ForgotPassword page after clicking forgot password link', async () => {
    await spectator.fixture.whenStable();

    spectator.click('.forgot-password');

    await spectator.fixture.whenStable();

    expect(spectator.inject(Location).path()).toBe('/login/recover-password');
  });

  it('should toggle password view style after clicking view password btn', () => {
    spectator.typeInElement(
      'asdf',
      spectator.query(byPlaceholder('Password')) as HTMLElement
    );
    spectator.click('.view-password');
    expect(spectator.query(byPlaceholder('Password'))).toHaveAttribute(
      'type',
      'text'
    );
  });
});
