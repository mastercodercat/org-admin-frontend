import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembersComponent } from './components/members/members.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PermissionsComponent } from './components/permissions/permissions.component';

const routes: Routes = [
  {
    path: 'members',
    component: MembersComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
