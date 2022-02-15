import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsModule } from './icons/icons.module';
import { OrgCompLibComponent } from './org-comp-lib.component';



@NgModule({
  declarations: [
    OrgCompLibComponent,
  ],
  imports: [
    NzButtonModule,
    IconsModule
  ],
  exports: [
    OrgCompLibComponent,
    IconsModule,
  ],
})
export class OrgCompLibModule { }
