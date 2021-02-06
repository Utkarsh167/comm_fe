import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlsListComponent } from './rtls-list.component';

describe('RtlsListComponent', () => {
  let component: RtlsListComponent;
  let fixture: ComponentFixture<RtlsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtlsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtlsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
