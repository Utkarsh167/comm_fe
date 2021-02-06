import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTripHistoryComponent } from './dashboard-trip-history.component';

describe('DashboardTripHistoryComponent', () => {
  let component: DashboardTripHistoryComponent;
  let fixture: ComponentFixture<DashboardTripHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTripHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTripHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
