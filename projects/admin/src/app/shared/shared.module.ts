import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PasswordValidatorComponent } from './components/password-validator/password-validator.component';

@NgModule({
  declarations: [
    PasswordValidatorComponent,
  ],
  imports: [
    NzTypographyModule,
    NzIconModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    // Ant Design
    NzAlertModule,
    NzLayoutModule,
    NzTypographyModule,
    NzButtonModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    NzUploadModule,
    NzSelectModule,
    NzFormModule,
    NzDropDownModule,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    NzAvatarModule,
    NzTabsModule,
    NzTableModule,
    NzCollapseModule,
    NzCardModule,
    NzSpinModule,
    NzNotificationModule,
    NzPopoverModule,
    PasswordValidatorComponent,
  ],
  providers: [],
})
export class SharedModule {}
