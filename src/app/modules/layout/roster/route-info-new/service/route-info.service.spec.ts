import { TestBed } from '@angular/core/testing';

import { RouteInfoService } from './route-info.service';

describe('RouteInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteInfoService = TestBed.get(RouteInfoService);
    expect(service).toBeTruthy();
  });
});
