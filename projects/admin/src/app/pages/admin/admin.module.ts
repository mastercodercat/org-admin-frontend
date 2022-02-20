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
import { ImportComponent } from './components/import/import.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LandingPageDomainsComponent } from './components/landing-page-domains/landing-page-domains.component';
import { DomainViewComponent } from './components/landing-page-domains/domain-view/domain-view.component';
import { DomainsEffects } from './store/effects/domains.effects';
import * as fromDomains from './store/reducers/domains.reducer';
import { MembersEffects } from './store/effects/members.effects';
import * as fromMembers from './store/reducers/members.reducer';

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
    ImportComponent,
  ],
  exports: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromDomains.domainsFeatureKey, fromDomains.domainsReducer),
    StoreModule.forFeature(fromMembers.membersFeatureKey, fromMembers.membersReducer),
    EffectsModule.forFeature([DomainsEffects, MembersEffects]),
  ],
})
export class AdminModule {}
