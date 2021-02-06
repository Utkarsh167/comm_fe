import { TestBed } from '@angular/core/testing';

import { CabMappingService } from './cab-mapping.service';

describe('CabMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabMappingService = TestBed.get(CabMappingService);
    expect(service).toBeTruthy();
  });
});
