import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedGroupComponent } from './updated-group.component';

describe('UpdatedGroupComponent', () => {
  let component: UpdatedGroupComponent;
  let fixture: ComponentFixture<UpdatedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
