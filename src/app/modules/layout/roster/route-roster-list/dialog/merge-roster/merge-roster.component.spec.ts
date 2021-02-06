import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeRosterComponent } from './merge-roster.component';

describe('MergeRosterComponent', () => {
  let component: MergeRosterComponent;
  let fixture: ComponentFixture<MergeRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
