import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { JoinComponent } from './join.component';
import { JoinRoutingModule } from './join-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    JoinComponent,
  ],
  exports: [
    JoinComponent,
  ],
  imports: [
    SharedModule,
    JoinRoutingModule,
  ]
})

export class JoinModule {

}
