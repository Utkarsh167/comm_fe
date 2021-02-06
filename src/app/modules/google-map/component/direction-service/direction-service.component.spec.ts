import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionServiceComponent } from './direction-service.component';

describe('DirectionServiceComponent', () => {
  let component: DirectionServiceComponent;
  let fixture: ComponentFixture<DirectionServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
