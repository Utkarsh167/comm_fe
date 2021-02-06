import { TestBed } from '@angular/core/testing';

import { CabAddService } from './cab-add.service';

describe('CabAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabAddService = TestBed.get(CabAddService);
    expect(service).toBeTruthy();
  });
});
