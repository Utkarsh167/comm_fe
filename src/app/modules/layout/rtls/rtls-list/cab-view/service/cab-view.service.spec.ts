import { TestBed } from '@angular/core/testing';

import { CabViewService } from './cab-view.service';

describe('CabViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabViewService = TestBed.get(CabViewService);
    expect(service).toBeTruthy();
  });
});
