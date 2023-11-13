import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageComponent } from './alert-message.component';

describe('ConfirmationMessageComponent', () => {
  let component: AlertMessageComponent;
  let fixture: ComponentFixture<AlertMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertMessageComponent]
    });
    fixture = TestBed.createComponent(AlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
