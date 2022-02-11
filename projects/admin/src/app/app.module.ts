import { APP_BASE_HREF } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppEffects } from '../../../../src/app/store/effects/app.effects';
import { GraphQLModule } from './graphql.module';
import { UserEffects } from '../../../../src/app/store/effects/user.effects';
import * as fromUsers from '../../../../src/app/store/reducers/user.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule,
  ],
  // Set router root to /
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

@NgModule({})
export class AdminModule{
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }
}
