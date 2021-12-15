import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { CreateOrganizationComponent } from './create-organization.component';
import { FormBuilder } from '@angular/forms';

describe('CreateOrganizationComponent', () => {
  let spectator: Spectator<CreateOrganizationComponent>;
  const createComponent = createComponentFactory({
    component: CreateOrganizationComponent,
    providers: [FormBuilder],
    imports: [
      RouterTestingModule,
      SharedModule,
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      HttpClientModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query(byText('Create an Organization'))).toExist();
  });
});
