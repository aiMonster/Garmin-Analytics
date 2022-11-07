import { Component, OnInit } from '@angular/core';
import { IActivity } from './interfaces/activity.interface';
import { ActivitiesMock } from './mocks/activities.mock';
import { ActivitiesService } from './services/activities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}

  /** On Init */
  ngOnInit(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      this.activitiesService.initActivities(event.data);
      this.loading = false;
    });

    this.setupMockData();
  }

  /** Setups mock data for local testing */
  private setupMockData(): void {
    this.loading = false;
    this.activitiesService.initActivities(ActivitiesMock);
  }
}
