import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabDetailComponent } from './cab-detail.component';

describe('CabDetailComponent', () => {
  let component: CabDetailComponent;
  let fixture: ComponentFixture<CabDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
