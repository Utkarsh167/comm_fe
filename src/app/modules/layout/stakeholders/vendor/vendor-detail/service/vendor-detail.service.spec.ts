import { TestBed } from '@angular/core/testing';

import { VendorDetailService } from './vendor-detail.service';

describe('VendorDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorDetailService = TestBed.get(VendorDetailService);
    expect(service).toBeTruthy();
  });
});
