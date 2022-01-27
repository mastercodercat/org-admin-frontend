import {
  Spectator,
  byText,
  createComponentFactory,
  byPlaceholder,
} from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ExportOutline,
  MoreOutline,
  CaretLeftOutline,
  RadarChartOutline,
} from '@ant-design/icons-angular/icons';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { MembersComponent } from './members.component';

const icons: IconDefinition[] = [
  ExportOutline,
  MoreOutline,
  CaretLeftOutline,
  RadarChartOutline,
];

describe('MembersComponent', () => {
  let spectator: Spectator<MembersComponent>;
  const createComponent = createComponentFactory({
    component: MembersComponent,
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
      NzIconModule.forChild(icons),
      HttpClientModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(
      spectator.query(byPlaceholder('Search members, accounts...')),
    ).toExist();
    expect(spectator.query(byText('Invite Members'))).toExist();
    expect(spectator.query(byText('Name'))).toExist();
    expect(spectator.query(byText('Email'))).toExist();
    expect(spectator.query(byText('Phone number'))).toExist();
    expect(spectator.query(byText('Accounts'))).toExist();
  });
});
