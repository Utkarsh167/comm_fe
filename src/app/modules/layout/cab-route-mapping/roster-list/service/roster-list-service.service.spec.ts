import { TestBed } from '@angular/core/testing';

import { RosterListServiceService } from './roster-list-service.service';

describe('RosterListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RosterListServiceService = TestBed.get(RosterListServiceService);
    expect(service).toBeTruthy();
  });
});
