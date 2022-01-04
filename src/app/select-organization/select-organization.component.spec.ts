import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/store/reducers';

import { SelectOrganizationComponent } from './select-organization.component';
import { FormBuilder } from '@angular/forms';

describe('SelectOrganizationComponent', () => {
  let spectator: Spectator<SelectOrganizationComponent>;
  const createComponent = createComponentFactory({
    component: SelectOrganizationComponent,
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
    expect(spectator.query(byText('Organizer'))).toExist();
    expect(spectator.query('button')).toHaveText('Log out of all accounts');
  });
});
