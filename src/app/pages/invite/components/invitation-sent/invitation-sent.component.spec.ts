import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { InvitationSentComponent } from './invitation-sent.component';

describe('InvitationSentComponent', () => {
  let spectator: Spectator<InvitationSentComponent>;
  const createComponent = createComponentFactory({
    component: InvitationSentComponent,
    imports: [RouterTestingModule, SharedModule, CommonModule],
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
