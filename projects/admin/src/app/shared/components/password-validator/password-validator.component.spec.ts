import {
  Spectator,
  createComponentFactory,
  byText,
} from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { MailOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from '../../../shared/shared.module';
import { reducers, metaReducers } from '../../../../../../../src/app/store/reducers';

import { PasswordValidatorComponent } from './password-validator.component';

const icons: IconDefinition[] = [MailOutline, UserOutline];

describe('PasswordValidatorComponent', () => {
  let spectator: Spectator<PasswordValidatorComponent>;
  const createComponent = createComponentFactory({
    component: PasswordValidatorComponent,
    imports: [
      SharedModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should display ui', () => {
    expect(spectator.query(byText('Your password must:'))).toExist();
    expect(
      spectator.query(byText('Be at least 8-10 characters long')),
    ).toExist();
    expect(
      spectator.query(byText('Have at least one special character')),
    ).toExist();
    expect(spectator.query(byText('Have at least one number'))).toExist();
    expect(spectator.query(byText('Have at least one lowercase'))).toExist();
    expect(spectator.query(byText('Have at least one uppercase'))).toExist();
  });
});
