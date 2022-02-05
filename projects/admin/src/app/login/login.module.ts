import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
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
  ],
  providers: [ ],
})

export class LoginModule { }
