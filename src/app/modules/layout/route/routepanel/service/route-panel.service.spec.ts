import { TestBed } from '@angular/core/testing';

import { RoutePanelService } from './route-panel.service';

describe('RoutePanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutePanelService = TestBed.get(RoutePanelService);
    expect(service).toBeTruthy();
  });
});
