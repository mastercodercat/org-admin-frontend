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
  RadarChartOutline,
} from '@ant-design/icons-angular/icons';
import { reducers, metaReducers } from '../../../../../store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';

import { PermissionCardComponent } from './permission-card.component';

const icons: IconDefinition[] = [
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
  RadarChartOutline,
];

describe('PermissionCardComponent', () => {
  let spectator: Spectator<PermissionCardComponent>;
  const createComponent = createComponentFactory({
    component: PermissionCardComponent,
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
      NzIconModule.forChild(icons),
    ],
  });
  const props = {
    title: 'PermissionCard',
    permissions: [
      {
        role: 'permission role 1',
        question: 'permission question 1',
      },
      {
        role: 'permission role 2',
        question: 'permission question 2',
      },
    ],
  };

  beforeEach(() => {
    spectator = createComponent({
      props,
    });
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText(props.title))).toExist();
    for (const permission of props.permissions) {
      expect(spectator.query(byText(permission.role))).toExist();
      expect(spectator.query(byText(permission.question))).toExist();
    }
  });
});
