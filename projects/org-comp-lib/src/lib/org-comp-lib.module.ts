import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OrgCompLibComponent } from './org-comp-lib.component';



@NgModule({
  declarations: [
    OrgCompLibComponent,
  ],
  imports: [
    NzButtonModule,
  ],
  exports: [
    OrgCompLibComponent,
  ],
})
export class OrgCompLibModule { }
