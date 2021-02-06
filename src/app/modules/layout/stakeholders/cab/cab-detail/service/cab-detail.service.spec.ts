import { TestBed } from '@angular/core/testing';

import { CabDetailService } from './cab-detail.service';

describe('CabDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabDetailService = TestBed.get(CabDetailService);
    expect(service).toBeTruthy();
  });
});
