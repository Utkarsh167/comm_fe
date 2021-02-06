import { TestBed } from '@angular/core/testing';

import { VendorListService } from './vendor-list.service';

describe('VendorListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorListService = TestBed.get(VendorListService);
    expect(service).toBeTruthy();
  });
});
