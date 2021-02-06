import { TestBed } from '@angular/core/testing';

import { CabArchiveService } from './cab-archive.service';

describe('CabArchiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabArchiveService = TestBed.get(CabArchiveService);
    expect(service).toBeTruthy();
  });
});
