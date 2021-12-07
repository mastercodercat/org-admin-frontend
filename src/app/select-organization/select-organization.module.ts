import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectOrganizationComponent } from './select-organization.component';
import { SelectOrganizationRoutingModule } from './select-organization-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SelectOrganizationComponent,
  ],
  exports: [
    SelectOrganizationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    SelectOrganizationRoutingModule,
  ]
})

export class SelectOrganizationModule {

}
