import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTripComponent } from './login-trip.component';

describe('LoginTripComponent', () => {
  let component: LoginTripComponent;
  let fixture: ComponentFixture<LoginTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
