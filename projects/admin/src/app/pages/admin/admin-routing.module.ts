import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembersComponent } from './components/members/members.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { LandingPageDomainsComponent } from './components/landing-page-domains/landing-page-domains.component';
import { DomainViewComponent } from './components/landing-page-domains/domain-view/domain-view.component';
import { ImportComponent } from './components/import/import.component';

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
  {
    path: 'landing-page-domains',
    component: LandingPageDomainsComponent,
  },
  {
    path: 'landing-page-domains/:id',
    component: DomainViewComponent,
  },
  {
    path: 'import',
    component: ImportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
