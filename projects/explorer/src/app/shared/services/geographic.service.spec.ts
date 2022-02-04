import { TestBed } from '@angular/core/testing';

import { GeographicService } from './geographic.service';

describe('GeographicService', () => {
  let service: GeographicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
