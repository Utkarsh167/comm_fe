import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorArchiveComponent } from './vendor-archive.component';

describe('VendorArchiveComponent', () => {
  let component: VendorArchiveComponent;
  let fixture: ComponentFixture<VendorArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
