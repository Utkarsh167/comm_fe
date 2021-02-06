import { TestBed } from '@angular/core/testing';

import { DriverListService } from './driver-list.service';

describe('DriverListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverListService = TestBed.get(DriverListService);
    expect(service).toBeTruthy();
  });
});
