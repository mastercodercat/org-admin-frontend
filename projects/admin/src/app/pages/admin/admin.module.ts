import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdminComponent } from './admin.component';
import { MembersComponent } from './components/members/members.component';
import { MemberRowComponent } from './components/members/member-row/member-row.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountCollapseComponent } from './components/accounts/account-collapse/account-collapse.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { SubPermissionComponent } from './components/permissions/sub-permission/sub-permission.component';
import { PermissionCardComponent } from './components/permissions/permission-card/permission-card.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LandingPageDomainsComponent } from './components/landing-page-domains/landing-page-domains.component';
import { DomainsEffects } from './store/domains.effects';
import * as fromDomains from './store/domains.reducer';
import { DomainViewComponent } from './components/landing-page-domains/domain-view/domain-view.component';

@NgModule({
  declarations: [
    AdminComponent,
    MembersComponent,
    MemberRowComponent,
    AccountsComponent,
    AccountCollapseComponent,
    PermissionsComponent,
    SubPermissionComponent,
    PermissionCardComponent,
    LandingPageDomainsComponent,
    DomainViewComponent,
  ],
  exports: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromDomains.domainsFeatureKey, fromDomains.domainsReducer),
    EffectsModule.forFeature([DomainsEffects]),
  ],
})
export class AdminModule {}
