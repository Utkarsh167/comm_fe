import { TestBed } from '@angular/core/testing';

import { DriverAddService } from './driver-add.service';

describe('DriverAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverAddService = TestBed.get(DriverAddService);
    expect(service).toBeTruthy();
  });
});
