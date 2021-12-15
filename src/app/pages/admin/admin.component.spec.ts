import { RouterTestingModule } from '@angular/router/testing';
import {
  Spectator,
  byText,
  createRoutingFactory,
  createComponentFactory,
  byPlaceholder,
  SpectatorRouting,
} from '@ngneat/spectator';
import { Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, ApartmentOutline } from '@ant-design/icons-angular/icons';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';

const icons: IconDefinition[] = [UserOutline, ApartmentOutline];

describe('AdminComponent', () => {
  let spectator: Spectator<AdminComponent>;
  const createComponent = createComponentFactory({
    component: AdminComponent,
    providers: [RouterModule],
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      NzIconModule.forRoot(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', async () => {
    await spectator.fixture.whenStable();
    expect(spectator).toBeTruthy();
  });
});
