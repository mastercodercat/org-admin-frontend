import { TestBed } from '@angular/core/testing';

import { AccountSelectionGuard } from './account-selection.guard';

xdescribe('AccountSeletionGuardService', () => {
  let service: AccountSelectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSelectionGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
