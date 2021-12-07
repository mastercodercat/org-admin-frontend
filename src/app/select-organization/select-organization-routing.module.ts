import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectOrganizationComponent } from './select-organization.component';

const routes: Routes = [
  {
    path: '**',
    component: SelectOrganizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SelectOrganizationRoutingModule {

}
