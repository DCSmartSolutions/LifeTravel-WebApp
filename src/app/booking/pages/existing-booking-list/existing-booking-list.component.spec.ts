import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBookingListComponent } from './existing-booking-list.component';

describe('ExistingBookingListComponent', () => {
  let component: ExistingBookingListComponent;
  let fixture: ComponentFixture<ExistingBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistingBookingListComponent]
    });
    fixture = TestBed.createComponent(ExistingBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
