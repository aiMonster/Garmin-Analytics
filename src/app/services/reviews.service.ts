import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReview } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  readonly SLACK_URL = 'https://hooks.slack.com/services';
  readonly REVIEWS_WEB_HOOK_ID = 'T04F2BEHV4Y/B04E9QJA8LD/HnDGYzrVDUiFQsakMd92UPsR';

  constructor(private readonly httpClient: HttpClient) { }

  sendReview(review: IReview): Observable<string> {
    const url = `${ this.SLACK_URL }/${ this.REVIEWS_WEB_HOOK_ID }`;
    return this.httpClient.post(url, this.buildReview(review), { responseType: 'text' });
  }

  private buildReview(review: IReview): string {
    return JSON.stringify({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `You have a new review from ${ review.userProfile.name }`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Id:* ${ review.userProfile.id }\n*Email:* ${ review.email }`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "plain_text",
            text: review.message
          }
        }
      ]
    });
  }
}
