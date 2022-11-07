import { Component, Input } from '@angular/core';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { IActivity } from 'src/app/interfaces/activity.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  runActivitiesCriteria: IActivityCriteria = {
    activityType: ActivityType.Run
  };

  constrastShowerCriteria: IActivityCriteria = {
    activityType: ActivityType.Other,
    nameLike: "Contrast Shower"
  };

  strengthActivitiesCriteria: IActivityCriteria = {
    activityType: ActivityType.Strength
  };

  meditationActivitiesCriteris: IActivityCriteria = {
    activityType: ActivityType.Meditation
  };
}
