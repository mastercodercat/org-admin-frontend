import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MailOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { AppComponent } from './app.component';
import { FormBuilder } from '@angular/forms';

const icons: IconDefinition[] = [MailOutline, UserOutline];

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      NzIconModule.forChild(icons),
      HttpClientModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should display ui', () => {
    expect(spectator.component).toBeTruthy();
  });
});
