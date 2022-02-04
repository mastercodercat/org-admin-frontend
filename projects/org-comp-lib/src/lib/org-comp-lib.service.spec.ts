import { TestBed } from '@angular/core/testing';

import { OrgCompLibService } from './org-comp-lib.service';

describe('OrgCompLibService', () => {
  let service: OrgCompLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgCompLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
