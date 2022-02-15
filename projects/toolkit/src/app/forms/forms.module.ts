import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { ListComponent } from './list/list.component';
import * as fromForm from './store/reducers/form.reducer';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { FormEffects } from './store/effects/form.effects';
import { CreateModalComponent } from './create-modal/create-modal.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateModalComponent,
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,

    // NgRx
    EffectsModule.forFeature([FormEffects]),
    StoreModule.forFeature(fromForm.formFeatureKey, fromForm.formReducer),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],
  ]
})
export class FormsModule { }
