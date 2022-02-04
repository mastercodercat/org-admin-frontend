import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { MembersComponent } from './components/members/members.component';
import { MemberRowComponent } from './components/members/member-row/member-row.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountCollapseComponent } from './components/accounts/account-collapse/account-collapse.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { SubPermissionComponent } from './components/permissions/sub-permission/sub-permission.component';
import { PermissionCardComponent } from './components/permissions/permission-card/permission-card.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    MembersComponent,
    MemberRowComponent,
    AccountsComponent,
    AccountCollapseComponent,
    PermissionsComponent,
    SubPermissionComponent,
    PermissionCardComponent,
  ],
  exports: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
