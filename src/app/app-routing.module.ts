import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/page.module').then(m => m.PageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'join',
    loadChildren: () => import('./pages/join/join.module').then(m => m.JoinModule),
  },
  {
    path: 'select-organization',
    loadChildren: () => import('./select-organization/select-organization.module').then(m => m.SelectOrganizationModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
