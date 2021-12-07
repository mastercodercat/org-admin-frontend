import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { InviteComponent } from './invite.component';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';
import { InviteRoutingModule } from './invite-routing.module';
import { AssignRolesComponent } from './components/assign-roles/assign-roles.component';
import { InvitationSentComponent } from './components/invitation-sent/invitation-sent.component';

@NgModule({
  declarations: [
    InviteComponent,
    InviteMembersComponent,
    AssignRolesComponent,
    InvitationSentComponent,
  ],
  exports: [InviteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzLayoutModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzTypographyModule,
    NzButtonModule,
    NzInputModule,
    NzUploadModule,
    NzRadioModule,
    NzFormModule,
    NzTableModule,
    NzSelectModule,
    NzSpinModule,

    InviteRoutingModule,
  ],
})
export class InviteModule {}
