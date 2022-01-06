import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RadarChartOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [RadarChartOutline];

import { InvitationSentComponent } from './invitation-sent.component';

describe('InvitationSentComponent', () => {
  let spectator: Spectator<InvitationSentComponent>;
  const createComponent = createComponentFactory({
    component: InvitationSentComponent,
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
    expect(spectator.query(byText('Your invitation was sent!'))).toExist();
    expect(spectator.query(byText('Return to Managing My Account'))).toExist();
  });
});
