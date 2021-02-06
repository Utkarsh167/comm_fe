import { TestBed } from '@angular/core/testing';

import { DriverDetailService } from './driver-detail.service';

describe('DriverDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverDetailService = TestBed.get(DriverDetailService);
    expect(service).toBeTruthy();
  });
});
