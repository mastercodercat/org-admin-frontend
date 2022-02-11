import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from '../../shared/shared.module';
import { reducers, metaReducers } from '../../../../../../src/app/store/reducers';
import { OrganizationComponent } from './organization.component';

const icons: IconDefinition[] = [UserOutline];

describe('OrganizationComponent', () => {
  let spectator: Spectator<OrganizationComponent>;
  const createComponent = createComponentFactory({
    component: OrganizationComponent,
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
  });
});
