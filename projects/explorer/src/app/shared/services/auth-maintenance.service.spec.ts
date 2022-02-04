import { TestBed } from '@angular/core/testing';

import { AuthGuardMaintenance } from './auth-maintenance.service';

xdescribe('AuthGuardMaintenance', () => {
  let service: AuthGuardMaintenance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardMaintenance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
