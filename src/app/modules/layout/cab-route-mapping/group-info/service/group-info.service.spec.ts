import { TestBed } from '@angular/core/testing';

import { GroupInfoService } from './group-info.service';

describe('GroupInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupInfoService = TestBed.get(GroupInfoService);
    expect(service).toBeTruthy();
  });
});
