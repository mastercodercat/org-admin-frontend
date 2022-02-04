import { TestBed } from '@angular/core/testing';

import { HighchartMapService } from './highchart-map.service';

xdescribe('HighchartMapService', () => {
  let service: HighchartMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
