import { TestBed } from '@angular/core/testing';

import { TripHistoryListService } from './trip-history-list.service';

describe('TripHistoryListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripHistoryListService = TestBed.get(TripHistoryListService);
    expect(service).toBeTruthy();
  });
});
