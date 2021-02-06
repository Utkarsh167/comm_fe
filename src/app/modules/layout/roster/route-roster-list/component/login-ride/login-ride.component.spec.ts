import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRideComponent } from './login-ride.component';

describe('LoginRideComponent', () => {
  let component: LoginRideComponent;
  let fixture: ComponentFixture<LoginRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
