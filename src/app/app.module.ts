import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from "../../projects/admin/src/app/app.module";
import { ExplorerModule } from "../../projects/explorer/src/app/app.module";
import { FormsModule } from "../../projects/forms/src/app/app.module";

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzAvatarModule,
    NzLayoutModule,
    NzDropDownModule,
    NzIconModule,
    AdminModule.forRoot(),
    ExplorerModule.forRoot(),
    FormsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
