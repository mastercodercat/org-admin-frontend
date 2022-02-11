import { TestBed } from '@angular/core/testing';

import { DomainsService } from './domains.service';

describe('DomainsService', () => {
  let service: DomainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
