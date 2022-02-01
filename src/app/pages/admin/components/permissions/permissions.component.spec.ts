import {
  Spectator,
  byText,
  createComponentFactory,
} from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
  UserAddOutline,
  RadarChartOutline,
} from '@ant-design/icons-angular/icons';
import { reducers, metaReducers } from '../../../../store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

import { PermissionsComponent } from './permissions.component';

const icons: IconDefinition[] = [
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
  UserAddOutline,
  RadarChartOutline,
];

describe('PermissionsComponent', () => {
  let spectator: Spectator<PermissionsComponent>;
  const createComponent = createComponentFactory({
    component: PermissionsComponent,
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText('Data'))).toExist();
    expect(spectator.query(byText('Accounts'))).toExist();
    expect(spectator.query(byText('Features & Tools'))).toExist();
    expect(spectator.query('button')).toHaveText('United States');
    expect(spectator.query(byText('Edit')));
    expect(spectator.query(byText('L2, TargetSmart')));
  });
});
