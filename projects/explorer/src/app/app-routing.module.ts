import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqComponent } from './faq/faq.component';

import { AccountSelectionGuard } from './shared/services/account-selection.guard';

const routes: Routes = [
  { path: 'explorer', component: DashboardComponent, canActivate: [AccountSelectionGuard] },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
