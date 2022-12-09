import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReview } from 'src/app/interfaces/review.interface';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-leave-review-dialog',
  templateUrl: './leave-review-dialog.component.html',
  styleUrls: ['./leave-review-dialog.component.scss']
})
export class LeaveReviewDialogComponent implements OnInit {

  review: IReview = {
    userProfile: {
      id: '',
      name: ''
    },
    email: '',
    message: ''
  };

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly reviewsService: ReviewsService,
  ) { }

  ngOnInit(): void {
  }

  sendReview(): void {
    this.reviewsService.sendReview(this.review).subscribe(() => {
      this.ref.close(true);
    });
  }
}
