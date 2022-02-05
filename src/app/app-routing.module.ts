import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../../projects/admin/src/app/app.module';
import { ExplorerModule } from '../../projects/explorer/src/app/app.module';
import { FormsModule } from '../../projects/forms/src/app/app.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<AdminModule> => import('../../projects/admin/src/app/app.module') .then(m => m.AdminModule),
  }, {
    path: '',
    loadChildren: (): Promise<ExplorerModule> => import('../../projects/explorer/src/app/app.module') .then(m => m.ExplorerModule),
  }, {
    path: '',
    loadChildren: (): Promise<FormsModule> => import('../../projects/forms/src/app/app.module') .then(m => m.FormsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
