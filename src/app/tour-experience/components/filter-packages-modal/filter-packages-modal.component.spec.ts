import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPackagesModal } from './filter-packages-modal.component';

describe('FilterPackagesModalComponent', () => {
  let component: FilterPackagesModal;
  let fixture: ComponentFixture<FilterPackagesModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPackagesModal]
    });
    fixture = TestBed.createComponent(FilterPackagesModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
