import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabAddComponent } from './cab-add.component';

describe('CabAddComponent', () => {
  let component: CabAddComponent;
  let fixture: ComponentFixture<CabAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
