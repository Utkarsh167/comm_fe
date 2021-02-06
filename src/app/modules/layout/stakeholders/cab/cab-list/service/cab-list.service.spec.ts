import { TestBed } from '@angular/core/testing';

import { CabListService } from './cab-list.service';

describe('CabListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabListService = TestBed.get(CabListService);
    expect(service).toBeTruthy();
  });
});
