import { TestBed } from '@angular/core/testing';

import { RouteRosterListService } from './route-roster-list.service';

describe('RouteRosterListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteRosterListService = TestBed.get(RouteRosterListService);
    expect(service).toBeTruthy();
  });
});
