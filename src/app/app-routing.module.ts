import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminModule} from "../../projects/admin/src/app/app.module";
import {ExplorerModule} from "../../projects/explorer/src/app/app.module";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`../../projects/admin/src/app/app.module`) .then(m => m.AdminModule)
  }, {
    path: '',
    loadChildren: () => import(`../../projects/explorer/src/app/app.module`) .then(m => m.ExplorerModule)
  }, {
    path: '',
    loadChildren: () => import(`../../projects/forms/src/app/app.module`) .then(m => m.FormsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
