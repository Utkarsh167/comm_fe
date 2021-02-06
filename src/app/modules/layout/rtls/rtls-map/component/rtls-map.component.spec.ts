import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlsMapComponent } from './rtls-map.component';

describe('RtlsMapComponent', () => {
  let component: RtlsMapComponent;
  let fixture: ComponentFixture<RtlsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtlsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtlsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
