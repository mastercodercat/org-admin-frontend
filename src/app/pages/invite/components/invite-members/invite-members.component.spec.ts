import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserAddOutline } from '@ant-design/icons-angular/icons';

import { InviteMembersComponent } from './invite-members.component';
import { HttpClientModule } from '@angular/common/http';

const icons: IconDefinition[] = [UserAddOutline];

describe('InviteMembersComponent', () => {
  let spectator: Spectator<InviteMembersComponent>;
  const createComponent = createComponentFactory({
    component: InviteMembersComponent,
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      HttpClientModule,
      NzIconModule.forRoot(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText('a. Enter email addresses'))).toExist();
    expect(
      spectator.query(
        byText('Enter one or more email addresses; comma separated.')
      )
    ).toExist();
    expect(spectator.query('button')).toHaveText('Invite via email');
    expect(spectator.query(byText('b. Import .csv files'))).toExist();
    expect(spectator.query(byText('download CSV template'))).toExist();
    expect(spectator.query(byText('Drop .csv files to upload'))).toExist();
    expect(spectator.query(byText('or browse to choose a file'))).toExist();
  });
});
