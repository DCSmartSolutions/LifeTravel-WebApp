import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingVehicleListComponent } from './existing-vehicle-list.component';

describe('ExistingVehicleListComponent', () => {
  let component: ExistingVehicleListComponent;
  let fixture: ComponentFixture<ExistingVehicleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistingVehicleListComponent]
    });
    fixture = TestBed.createComponent(ExistingVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
