import { TestBed } from '@angular/core/testing';

import { DriverArchiveService } from './driver-archive.service';

describe('DriverArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverArchiveService = TestBed.get(DriverArchiveService);
    expect(service).toBeTruthy();
  });
});
