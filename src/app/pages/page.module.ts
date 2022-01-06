import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { PageRoutingModule } from './page-routing.module';
import { AdminModule } from './admin/admin.module';
import { PageComponent } from './page.component';
import { CreateOrganizationComponent } from './organization/create-organization/create-organization.component';
import { OrganizationComponent } from './organization/organization.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    PageComponent,
    OrganizationComponent,
    CreateOrganizationComponent,
    HomeComponent,
    LogoutComponent,
    ProfileComponent,
  ],
  exports: [],
  imports: [
    AdminModule,
    PageRoutingModule,
    SharedModule,
    FormsModule,

    // NgRx
    StoreModule.forFeature('', {}),
    EffectsModule.forFeature([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
})
export class PageModule {}
