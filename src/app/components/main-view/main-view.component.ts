import { Component, Input, OnInit } from '@angular/core';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { IActivity } from 'src/app/interfaces/activity.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @Input() activities: IActivity[] = [];

  runActivities: IActivity[] = [];
  contrastShowerActivities: IActivity[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setupRunsSummary();
    this.setupContrastShowerSummary();
  }

  private setupRunsSummary(): void {
    this.runActivities = this.activities
      .filter(activity => activity.activityType.typeId === ActivityType.Run);
  }

  private setupContrastShowerSummary(): void {
    this.contrastShowerActivities = this.activities
      .filter(activity => activity.activityType.typeId === ActivityType.Other && activity.activityName === 'Contrast Shower');
  };

  
}
