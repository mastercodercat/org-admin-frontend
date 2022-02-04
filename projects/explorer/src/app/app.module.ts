import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule  } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule  } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule  } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule  } from 'ng-zorro-antd/select';
import { NzSwitchModule  } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule  } from 'ng-zorro-antd/table';
import { NzTagModule  } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsMapComponent } from './shared/components/us-map/us-map.component';
import { SearchBoxComponent } from './shared/components/search-box/search-box.component';
import { SelectionSummaryComponent } from './shared/components/selection-summary/selection-summary.component';
import { ThousandSuffixesPipe } from './shared/pipes/thousand-suff.pipe';

import {environment, environment as env} from '../environments/environment';
import { HorizontalBarChartComponent } from './shared/components/horizontal-bar-chart/horizontal-bar-chart.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { AccountInterceptor } from '../core/account.interceptor';
import { SelectionToolTagboxComponent } from './shared/components/selection-tool-tagbox/selection-tool-tagbox.component';
import { FilterBoxComponent } from './shared/components/filter-box/filter-box.component';
import { UsMapStatesComponent } from './shared/components/us-map-states/us-map-states.component';
import { UsMapCongressionalDistrictsComponent } from './shared/components/us-map-congressional-districts/us-map-congressional-districts.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as fromExplorer from './shared/stores/state-store/explorer.reducer';
import { ExplorerEffects } from './shared/stores/state-store/explorer.effects';
import { GeoFiltersDrawerComponent } from './shared/components/geo-filters-drawer/geo-filters-drawer.component';
import * as fromExplorerFilters from './shared/stores/filter-store/explorer-filters.reducer';
import { ExplorerFiltersEffects } from './shared/stores/filter-store/explorer-filters.effects';
import { MyCommunitiesDrawerComponent } from './shared/components/my-communities-drawer/my-communities-drawer.component';
import * as fromExplorerGeoFilter from './shared/stores/geo-filter-store/explorer-geo-filter.reducer';
import { ExplorerGeoFilterEffects } from './shared/stores/geo-filter-store/explorer-geo-filter.effects';
import { CommunitySaveDrawerComponent } from './shared/components/community-save-drawer/community-save-drawer.component';
import { CompareChartsComponent } from './shared/components/compare-charts/compare-charts.component';


registerLocaleData(en);

const auth = env.auth;
const httpInterceptor = env.httpInterceptor;

if (auth.domain === '{PLACEHOLDER}') {
  switch (window.location.hostname) {
  case 'login.civicexplorer.com':
    auth.domain = 'helm-prod.us.auth0.com';
    auth.clientId = 'rMOk6HWMNk51ZFWIW5pn43iunnL6yyto';
    auth.audience = 'http://helmteam.us';
    break;
  case 'staging-www.civicexplorer.com':
    auth.domain = 'helm-staging.us.auth0.com';
    auth.clientId = 'BYjmdIqgpSnVrIZLSmldUCvPVdwZzGpD';
    auth.audience = 'http://helmteam.us';
    break;
  }
}
if (env.apiURL === '{PLACEHOLDER}') {
  switch (window.location.hostname) {
  case 'login.civicexplorer.com':
    httpInterceptor.allowedList = ['https://production.explorer.organizer.helmahead.com/*'];
    break;
  case 'staging-www.civicexplorer.com':
    httpInterceptor.allowedList = ['https://staging.explorer.organizer.helmahead.com/*'];
    break;
  case 'sandbox-www.civicexplorer.com':
    httpInterceptor.allowedList = ['https://sandbox.explorer.organizer.helmahead.com/*'];
    break;
  }
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsMapComponent,
    SearchBoxComponent,
    SelectionSummaryComponent,
    ThousandSuffixesPipe,
    HorizontalBarChartComponent,
    LoadingSpinnerComponent,
    SelectionToolTagboxComponent,
    FilterBoxComponent,
    UsMapStatesComponent,
    UsMapCongressionalDistrictsComponent,
    GeoFiltersDrawerComponent,
    MyCommunitiesDrawerComponent,
    CommunitySaveDrawerComponent,
    CompareChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    GraphQLModule,
    NzAvatarModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzMessageModule,
    NzRadioModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzSelectModule,
    NzSwitchModule,
    NzToolTipModule,
    NzTableModule,
    NzTagModule,
    NzAlertModule,
    GraphQLModule,
    NzAutocompleteModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzTreeModule,
    NzModalModule,
    NzDrawerModule,
    NzSpinModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromExplorer.explorersFeatureKey, fromExplorer.reducer),
    EffectsModule.forFeature([ExplorerEffects, ExplorerFiltersEffects, ExplorerGeoFilterEffects]),
    StoreModule.forFeature(fromExplorerFilters.explorerFiltersFeatureKey, fromExplorerFilters.reducer),
    StoreModule.forFeature(fromExplorerGeoFilter.explorerGeoFilterFeatureKey, fromExplorerGeoFilter.reducer),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AccountInterceptor, multi: true },
    ThousandSuffixesPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

@NgModule({})
export class ExplorerModule{
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}
