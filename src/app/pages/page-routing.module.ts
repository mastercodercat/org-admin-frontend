import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';
import { CreateOrganizationComponent } from './organization/create-organization/create-organization.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminModule } from './admin/admin.module';
import { InviteModule } from './invite/invite.module';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'dashboard',
        component: AdminComponent,
        loadChildren: (): Promise<AdminModule> =>
          import('./admin/admin.module').then(m => m.AdminModule),
      },
      { path: 'home', component: HomeComponent },
      { path: 'create-org', component: CreateOrganizationComponent },
      { path: 'profile/:id', component: ProfileComponent },
      {
        path: 'invite',
        loadChildren: (): Promise<InviteModule> =>
          import('./invite/invite.module').then(m => m.InviteModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
