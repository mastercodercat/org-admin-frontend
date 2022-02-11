import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from '../../projects/admin/src/app/app.module';
import { ExplorerModule } from '../../projects/explorer/src/app/app.module';
import { FormsModule } from '../../projects/forms/src/app/app.module';
import { environment } from '../environments/environment';
import { AppEffects } from './store/effects/app.effects';
import { UserEffects } from './store/effects/user.effects';
import { metaReducers, reducers } from './store/reducers';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzAvatarModule,
    NzLayoutModule,
    NzDropDownModule,
    NzIconModule,

    // NgRx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects, UserEffects]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],

    // Helm Projects
    AdminModule.forRoot(),
    ExplorerModule.forRoot(),
    FormsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
