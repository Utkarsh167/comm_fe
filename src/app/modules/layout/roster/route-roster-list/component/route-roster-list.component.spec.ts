import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRosterListComponent } from './route-roster-list.component';

describe('RouteRosterListComponent', () => {
  let component: RouteRosterListComponent;
  let fixture: ComponentFixture<RouteRosterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteRosterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteRosterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
