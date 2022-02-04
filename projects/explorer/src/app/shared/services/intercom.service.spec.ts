import { TestBed } from '@angular/core/testing';

import { IntercomService } from './intercom.service';

describe('IntercomService', () => {
  let service: IntercomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
