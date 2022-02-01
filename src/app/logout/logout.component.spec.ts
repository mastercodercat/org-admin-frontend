import { RouterTestingModule } from '@angular/router/testing';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { Spectator, byText, createRoutingFactory } from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../store/reducers';
import { LogoutComponent } from './logout.component';

const icons: IconDefinition[] = [UserOutline];

describe('LogoutComponent', () => {
  let spectator: Spectator<LogoutComponent>;
  const createComponent = createRoutingFactory({
    component: LogoutComponent,
    imports: [
      RouterTestingModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      NzIconModule.forChild(icons),
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
