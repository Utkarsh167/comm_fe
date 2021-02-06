import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutRideComponent } from './logout-ride.component';

describe('LogoutRideComponent', () => {
  let component: LogoutRideComponent;
  let fixture: ComponentFixture<LogoutRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
