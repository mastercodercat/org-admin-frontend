import {
  byPlaceholder,
  byText,
  createRoutingFactory,
  SpectatorRouting,
} from '@ngneat/spectator';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WarningOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { SharedModule } from 'src/app/shared/shared.module';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { ResetPasswordComponent } from './reset-password.component';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';
import { Observable, Subscriber } from 'rxjs';

const icons: IconDefinition[] = [WarningOutline, UserOutline];

describe('ResetPasswordComponent', () => {
  let spectator: SpectatorRouting<ResetPasswordComponent>;
  const createComponent = createRoutingFactory({
    component: ResetPasswordComponent,
    declarations: [RecoverPasswordComponent],
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      NzIconModule.forChild(icons),
    ],
    stubsEnabled: false,
    routes: [
      {
        path: 'login/change-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'login/recover-password',
        component: RecoverPasswordComponent,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        isTokenValid$: new Observable<boolean>((observer: Subscriber<boolean>) => {
          observer.next(true);
        }),
      },
    });
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query('h1')).toHaveExactText('Change your password');
    expect(spectator.query('.reset-password-form')).toExist();
    expect(spectator.query(byPlaceholder('Password'))).toExist();
    expect(spectator.query('a')).toHaveExactText('View Password');
    expect(spectator.query(byPlaceholder('Password Confirmation'))).toExist();
    expect(spectator.query('.change-password-btn')).toHaveText('Continue');
    expect(spectator.query('.change-password-btn')).toBeDisabled();
  });

  it('should show password after clicking view password btn', () => {
    spectator.typeInElement(
      'asdf',
      spectator.query(byPlaceholder('Password')),
    );
    expect(spectator.query(byPlaceholder('Password'))).toHaveAttribute(
      'type',
      'password',
    );
    spectator.click(spectator.query(byText('View Password')));
    expect(spectator.query(byPlaceholder('Password'))).toHaveAttribute(
      'type',
      'text',
    );
  });

  it('should render validation error when password and confirmation do not match', () => {
    spectator.typeInElement(
      'angel@angel.co',
      spectator.query(byPlaceholder('Password')),
    );
    spectator.typeInElement(
      'ang@ang.co',
      spectator.query(byPlaceholder('Password Confirmation')),
    );

    expect(spectator.query('.validation-error')).toHaveText(
      'Passwords do not match',
    );
  });

  it('should set active continue button with valid password', () => {
    spectator.typeInElement(
      'angel@angel.co',
      spectator.query(byPlaceholder('Password')),
    );
    spectator.typeInElement(
      'ang@ang.co',
      spectator.query(byPlaceholder('Password Confirmation')),
    );

    expect(spectator.query('.change-password-btn')).toHaveText('Continue');
  });
});
