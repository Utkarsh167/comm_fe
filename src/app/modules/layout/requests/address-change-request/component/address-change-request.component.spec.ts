import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressChangeRequestComponent } from './address-change-request.component';

describe('AddressChangeRequestComponent', () => {
  let component: AddressChangeRequestComponent;
  let fixture: ComponentFixture<AddressChangeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressChangeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
