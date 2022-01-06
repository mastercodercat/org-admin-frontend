import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { GraphQLModule } from 'src/app/graphql.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MailOutline } from '@ant-design/icons-angular/icons';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { ProfileComponent } from './profile.component';
import { FormBuilder } from '@angular/forms';

const icons: IconDefinition[] = [MailOutline];

describe('ProfileComponent', () => {
  let spectator: Spectator<ProfileComponent>;
  const createComponent = createComponentFactory({
    component: ProfileComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      HttpClientModule,
      GraphQLModule,
      NzIconModule.forChild(icons),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.component).toBeTruthy();
  });
});
