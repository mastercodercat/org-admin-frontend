import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsModule } from 'org-comp-lib';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [
    ListHeaderComponent,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    NzGridModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    
    ListHeaderComponent,

    NzButtonModule,
    NzDropDownModule,
    NzFormModule,
    NzModalModule,
    NzIconModule,
    NzLayoutModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzPopoverModule,
    
  ]
})
export class SharedModule { }
