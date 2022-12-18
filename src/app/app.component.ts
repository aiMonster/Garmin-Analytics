import { Component, OnInit } from '@angular/core';
import { IActivity } from './interfaces/activity.interface';
// import { ActivitiesMock } from './mocks/activities.mock';
import { ActivitiesService } from './services/activities.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  private cachedActivities: IActivity[];

  /** Constructor */
  constructor(
    private readonly settingsService: SettingsService,
    private readonly activitiesService: ActivitiesService
  ) {}

  /** On Init */
  ngOnInit(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      this.handleEvent(JSON.parse(event.data));
    });

    this.settingsService.getActivitiesAsync().then((activities) => {
      this.cachedActivities = activities;

      const lastCachedItemTime = activities.length > 0 ? activities[activities.length - 1].startTimeLocal : null;
      const message = {
        sender: "GarminAnalytics",
        subject: "initialLoadCompleted",
        lastCachedItem: lastCachedItemTime
      };

      window.parent.postMessage(JSON.stringify(message), "*");
    });

    // this.setupMockData();
  }

  private handleEvent(message: any): void {
    if (!message.sender || message.sender !== 'GarminAnalyticsWeb') {
      return;
    }

    if (message.subject === 'dataLoaded') {
      this.activitiesService.initActivities([...this.cachedActivities, ...message.activities]);
      this.settingsService.insertActivitiesAsync(message.activities);
      this.settingsService.userProfile = message.userInfo;
      this.loading = false;
    }
  }

  /** Setups mock data for local testing */
  // private setupMockData(): void {
  //   this.loading = false;
  //   this.activitiesService.initActivities(ActivitiesMock);
  // }
}
