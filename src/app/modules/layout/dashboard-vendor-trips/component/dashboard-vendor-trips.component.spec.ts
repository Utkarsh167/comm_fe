import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVendorTripsComponent } from './dashboard-vendor-trips.component';

describe('DashboardVendorTripsComponent', () => {
  let component: DashboardVendorTripsComponent;
  let fixture: ComponentFixture<DashboardVendorTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVendorTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVendorTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
