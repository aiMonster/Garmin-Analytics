import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReviewDialogComponent } from './leave-review-dialog.component';

describe('LeaveReviewDialogComponent', () => {
  let component: LeaveReviewDialogComponent;
  let fixture: ComponentFixture<LeaveReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
