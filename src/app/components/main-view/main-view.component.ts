import { Component, Input, OnInit } from '@angular/core';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { IActivity } from 'src/app/interfaces/activity.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @Input() activities: IActivity[] = [];

  runActivitiesCriteria: IActivityCriteria = {
    activityType: ActivityType.Run
  };
  
  runActivities: IActivity[] = [];
  contrastShowerActivities: IActivity[] = [];
  strengthActivities: IActivity[] = [];
  meditationActivities: IActivity[] = [];

  ngOnInit(): void {
    this.setupRunsSummary();
    this.setupContrastShowerSummary();
    this.setupStrengthSummary();
    this.setupMeditationsSummary();
  }

  private setupRunsSummary(): void {
    this.runActivities = this.activities
      .filter(activity => activity.activityType.typeId === ActivityType.Run);
  }

  private setupContrastShowerSummary(): void {
    this.contrastShowerActivities = this.activities
      .filter(activity => activity.activityType.typeId === ActivityType.Other && activity.activityName === 'Contrast Shower');
  };

  private setupStrengthSummary(): void {
    this.strengthActivities = this.activities
      .filter(activity => activity.activityType.typeId === ActivityType.Strength);
  }

  private setupMeditationsSummary(): void {
    this.meditationActivities = this.activities
      .filter(activity => activity.activityType.typeId === ActivityType.Meditation);
  }
}
