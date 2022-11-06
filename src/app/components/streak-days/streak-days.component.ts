import { Component, Input, OnInit } from '@angular/core';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { IStreakDaysInfo } from 'src/app/interfaces/streak-days-info.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-streak-days',
  templateUrl: './streak-days.component.html',
  styleUrls: ['./streak-days.component.scss']
})
export class StreakDaysComponent implements OnInit {
  /** Criteria of activities to process */
  @Input() criterias: IActivityCriteria[];

  /** Streak days info */
  streakDaysInfo: IStreakDaysInfo;

  streakGoals: {
    target: number,
    achieved: boolean
  }[];

  readonly startColor = '#f8d54f';
  readonly endColor = '#e37961';
  readonly bwColor = '#b8b7b7';

  readonly colors = [
    ['#d8a6ef', '#c780e8'],
    ['#bab4ff', '#9d94ff'],
    ['#8bc6f9', '#59adf6'],
    ['#52dadf', '#08cad1'],
    ['#7be2bf', '#42d6a4'],
    ['#ffcba6', '#ffb480'],
    ['#ff9690', '#ff6961']
  ];

  get progressLineGradientColors(): string {
    const pointsColor: string[] = [
      this.startColor,
      ...this.streakGoals.map((goal, index) => {
        const completedColor = index === this.streakGoals.length - 1 ? this.endColor : this.colors[index][1];
        return goal.achieved ? completedColor : this.bwColor;
      })
    ];

    return pointsColor.join(',');;
  }

  get maxStreakDatesFormatted(): string {
    return this.streakDaysInfo?.maxDates
      .map(streakDates => DateUtils.formatDate(streakDates.start) + ' - ' + DateUtils.formatDate(streakDates.end))
      .join(', ');
  }
  
  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.streakDaysInfo = this.activitiesService.getStreakDaysInfo(this.criterias);
    
    const targets = [7, 30, 100, 150, 200, 250, 300, 365];

    this.streakGoals = targets.map((target) => ({ target, achieved: this.streakDaysInfo.current >= target }));
  }
}
