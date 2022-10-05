import { Component, OnInit } from '@angular/core';
import { IActivity } from './interfaces/activity.interface';
import { ActivitiesMock } from './mocks/activities.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = true;
  activities: IActivity[] | undefined;

  /** On Init */
  ngOnInit(): void {
    window.addEventListener('message', (data: unknown) => {
      this.activities = data as IActivity[];
      this.loading = false;
    });

    this.setupMockData();
  }

  /** Setups mock data for local testing */
  private setupMockData(): void {
    this.activities = ActivitiesMock;
    this.loading = false;
  }
}
