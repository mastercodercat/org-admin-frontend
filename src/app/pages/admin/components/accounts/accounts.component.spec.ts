import {
  Spectator,
  byText,
  createComponentFactory,
  byPlaceholder,
} from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MailOutline } from '@ant-design/icons-angular/icons';

import { AccountsComponent } from './accounts.component';
import { UserService } from 'src/app/shared/services/user/user.service';

const icons: IconDefinition[] = [MailOutline];

describe('AccountsComponent', () => {
  let spectator: Spectator<AccountsComponent>;
  const createComponent = createComponentFactory({
    component: AccountsComponent,
    providers: [UserService],
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
      HttpClientModule,
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    setTimeout(() => {
      expect(
        spectator.query(byPlaceholder('Search members, accounts...')),
      ).toExist();
      expect(spectator.query(byText('Create Organization'))).toExist();
    }, 3000);
  });
});
