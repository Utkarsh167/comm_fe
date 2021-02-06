import { TestBed } from '@angular/core/testing';

import { RtlsMapService } from './rtls-map.service';

describe('RtlsMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtlsMapService = TestBed.get(RtlsMapService);
    expect(service).toBeTruthy();
  });
});
