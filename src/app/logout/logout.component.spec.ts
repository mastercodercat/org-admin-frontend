import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createRoutingFactory } from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let spectator: Spectator<LogoutComponent>;
  const createComponent = createRoutingFactory({
    component: LogoutComponent,
    imports: [
      RouterTestingModule,
      StoreModule.forRoot(reducers, { metaReducers }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText('Log Out'))).toExist();
  });
});
