import { TestBed } from '@angular/core/testing';

import { VendorArchiveService } from './vendor-archive.service';

describe('VendorArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorArchiveService = TestBed.get(VendorArchiveService);
    expect(service).toBeTruthy();
  });
});
