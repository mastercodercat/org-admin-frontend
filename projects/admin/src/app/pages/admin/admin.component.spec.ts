import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, ApartmentOutline } from '@ant-design/icons-angular/icons';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

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
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator).toBeTruthy();
  });
});
