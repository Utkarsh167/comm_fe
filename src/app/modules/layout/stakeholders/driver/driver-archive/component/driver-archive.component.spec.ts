import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverArchiveComponent } from './driver-archive.component';

describe('DriverArchiveComponent', () => {
  let component: DriverArchiveComponent;
  let fixture: ComponentFixture<DriverArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
