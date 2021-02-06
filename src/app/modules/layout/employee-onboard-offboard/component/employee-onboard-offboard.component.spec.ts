import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnboardOffboardComponent } from './employee-onboard-offboard.component';

describe('EmployeeOnboardOffboardComponent', () => {
  let component: EmployeeOnboardOffboardComponent;
  let fixture: ComponentFixture<EmployeeOnboardOffboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOnboardOffboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOnboardOffboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
