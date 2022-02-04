import { TestBed } from '@angular/core/testing';

import { ChartDataGqlService } from './chart-data-gql.service';

describe('ChartDataGqlService', () => {
  let service: ChartDataGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
