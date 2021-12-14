import { Spectator, byText, createRoutingFactory } from '@ngneat/spectator';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let spectator: Spectator<LogoutComponent>;
  const createComponent = createRoutingFactory({
    component: LogoutComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText('Log Out'))).toExist();
  });
});
