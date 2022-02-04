import { NgModule } from '@angular/core';
import { JoinComponent } from './join.component';
import { JoinRoutingModule } from './join-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    JoinComponent,
  ],
  exports: [
    JoinComponent,
  ],
  imports: [
    SharedModule,
    JoinRoutingModule,
  ],
})

export class JoinModule {

}
