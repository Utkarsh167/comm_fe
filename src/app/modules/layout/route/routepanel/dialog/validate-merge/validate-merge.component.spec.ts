import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateMergeComponent } from './validate-merge.component';

describe('ValidateMergeComponent', () => {
  let component: ValidateMergeComponent;
  let fixture: ComponentFixture<ValidateMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
