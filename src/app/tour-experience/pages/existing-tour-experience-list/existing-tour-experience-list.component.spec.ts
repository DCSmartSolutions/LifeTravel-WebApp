import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingTourExperienceListComponent } from './existing-tour-experience-list.component';

describe('ExistingTourListComponent', () => {
  let component: ExistingTourExperienceListComponent;
  let fixture: ComponentFixture<ExistingTourExperienceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistingTourExperienceListComponent]
    });
    fixture = TestBed.createComponent(ExistingTourExperienceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
