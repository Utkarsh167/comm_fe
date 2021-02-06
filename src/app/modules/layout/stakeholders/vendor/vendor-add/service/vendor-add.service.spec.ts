import { TestBed } from '@angular/core/testing';

import { VendorAddService } from './vendor-add.service';

describe('VendorAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorAddService = TestBed.get(VendorAddService);
    expect(service).toBeTruthy();
  });
});
