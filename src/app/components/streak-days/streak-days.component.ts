import { Component, Input, OnInit } from '@angular/core';
import { IStreakDaysInfo } from 'src/app/interfaces/streak-days-info.interface';
import { IStreakGoal } from 'src/app/interfaces/streak-goal.interface';
import { IStreakDaysConfigs } from 'src/app/interfaces/widget-configs/streak-days-configs.interface';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-streak-days',
  templateUrl: './streak-days.component.html',
  styleUrls: ['./streak-days.component.scss']
})
export class StreakDaysComponent implements OnInit {
  /** Streak days info */
  @Input() streakDaysInfo: IStreakDaysInfo;

  /** Streak days configs */
  @Input() configs: IStreakDaysConfigs;

  /** Streak goals */
  streakGoals: IStreakGoal[];

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

  /** On Init */
  ngOnInit(): void {
    this.streakGoals = this.configs.targets.map((target) => ({ target, achieved: this.streakDaysInfo.current >= target }));
  }
}
