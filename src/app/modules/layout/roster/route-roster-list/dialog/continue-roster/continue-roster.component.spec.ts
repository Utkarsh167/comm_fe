import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueRosterComponent } from './continue-roster.component';

describe('ContinueRosterComponent', () => {
  let component: ContinueRosterComponent;
  let fixture: ComponentFixture<ContinueRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
