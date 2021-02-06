import { TestBed } from '@angular/core/testing';

import { ShiftAddService } from './shift-add.service';

describe('ShiftAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftAddService = TestBed.get(ShiftAddService);
    expect(service).toBeTruthy();
  });
});
