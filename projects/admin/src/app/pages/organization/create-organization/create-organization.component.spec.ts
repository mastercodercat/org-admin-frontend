import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../../../../../../src/app/store/reducers';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RadarChartOutline } from '@ant-design/icons-angular/icons';

import { CreateOrganizationComponent } from './create-organization.component';
import { FormBuilder } from '@angular/forms';

const icons: IconDefinition[] = [RadarChartOutline];

describe('CreateOrganizationComponent', () => {
  let spectator: Spectator<CreateOrganizationComponent>;
  const createComponent = createComponentFactory({
    component: CreateOrganizationComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      HttpClientModule,
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query(byText('Create an Organization'))).toExist();
  });
});
