import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutTripComponent } from './logout-trip.component';

describe('LogoutTripComponent', () => {
  let component: LogoutTripComponent;
  let fixture: ComponentFixture<LogoutTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
