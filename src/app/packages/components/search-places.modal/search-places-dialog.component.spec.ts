import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlacesDialog } from './search-places-dialog.component';

describe('SearchPlacesModalComponent', () => {
  let component: SearchPlacesDialog;
  let fixture: ComponentFixture<SearchPlacesDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPlacesDialog]
    });
    fixture = TestBed.createComponent(SearchPlacesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
