import {
  Spectator,
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
import { reducers, metaReducers } from '../../../../../../../../src/app/store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

import { ImportComponent } from './import.component';

const icons: IconDefinition[] = [
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
  UserAddOutline,
  RadarChartOutline,
];

describe('ImportComponent', () => {
  let spectator: Spectator<ImportComponent>;
  const createComponent = createComponentFactory({
    component: ImportComponent,
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
  });
});
