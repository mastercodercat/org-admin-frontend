import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { JoinModule } from './pages/join/join.module';
import { PageModule } from './pages/page.module';
import { SelectOrganizationModule } from './select-organization/select-organization.module';
import { AuthGuardService } from './shared/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<PageModule> => import('./pages/page.module').then(m => m.PageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: (): Promise<LoginModule> => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'join',
    loadChildren: (): Promise<JoinModule> => import('./pages/join/join.module').then(m => m.JoinModule),
  },
  {
    path: 'select-organization',
    loadChildren: (): Promise<SelectOrganizationModule> =>
      import('./select-organization/select-organization.module').then(m => m.SelectOrganizationModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
