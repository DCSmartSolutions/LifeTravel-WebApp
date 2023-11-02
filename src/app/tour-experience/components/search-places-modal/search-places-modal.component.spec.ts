import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlacesModalComponent } from './search-places-modal.component';

describe('SearchPlacesModalComponent', () => {
  let component: SearchPlacesModalComponent;
  let fixture: ComponentFixture<SearchPlacesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPlacesModalComponent]
    });
    fixture = TestBed.createComponent(SearchPlacesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
