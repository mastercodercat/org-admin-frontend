import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import { FormsModule } from './forms/forms.module';
import { AuthGuardService } from '../../../admin/src/app/shared/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'forms',
    loadChildren: (): Promise<FormsModule> =>
      import('./forms/forms.module').then(m => m.FormsModule),
      canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
