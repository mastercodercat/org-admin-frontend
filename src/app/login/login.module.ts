import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import * as fromLogin from './store/reducers/login.reducer';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RequestSentComponent } from './request-sent/request-sent.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoverPasswordComponent,
    RequestSentComponent,
    ResetPasswordComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    LoginRoutingModule,
    SharedModule,

    // NgRx
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.loginReducer),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],
  ],
  providers: [ ],
})

export class LoginModule { }
