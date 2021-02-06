import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCabMappingComponent } from './delete-cab-mapping.component';

describe('DeleteCabMappingComponent', () => {
  let component: DeleteCabMappingComponent;
  let fixture: ComponentFixture<DeleteCabMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCabMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCabMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
