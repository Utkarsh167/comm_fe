import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVendorCabComponent } from './assign-vendor-cab.component';

describe('AssignVendorCabComponent', () => {
  let component: AssignVendorCabComponent;
  let fixture: ComponentFixture<AssignVendorCabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVendorCabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVendorCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
