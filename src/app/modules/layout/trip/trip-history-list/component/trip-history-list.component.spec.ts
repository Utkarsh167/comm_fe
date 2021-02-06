import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripHistoryListComponent } from './trip-history-list.component';

describe('TripHistoryListComponent', () => {
  let component: TripHistoryListComponent;
  let fixture: ComponentFixture<TripHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
