import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from 'src/app/interfaces/activity.interface';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-streak-days',
  templateUrl: './streak-days.component.html',
  styleUrls: ['./streak-days.component.scss']
})
export class StreakDaysComponent implements OnInit {

  @Input() activities: IActivity[] = [];

  streakDays: number;
  maxStreakDays: number;
  maxStreakDates: [Date, Date][] = [];

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

  get getMaxStreakDatesFormatted(): string {
    return this.maxStreakDates
      .map(streakDates => DateUtils.formatDate(streakDates[0]) + ' - ' + DateUtils.formatDate(streakDates[1]))
      .join(', ');
  }
  
  constructor() { }

  ngOnInit(): void {
    this.calculateStreakDays();

    const targets = [7, 30, 100, 150, 200, 250, 300, 365];

    this.streakGoals = targets.map((target) => ({ target, achieved: this.streakDays >= target }));
  }

  private calculateStreakDays(): void {
    const runDays = this.activities.map(activity => activity.startTimeLocal.split(' ')[0]);

    const firstDate = new Date(runDays[runDays.length - 1]);
    const lastDate = new Date(runDays[0]);

    const datesRange = DateUtils.getAllDatesInTheRange(firstDate, lastDate);

    let sets: string[][] = [];
    let currentSet: string[] = [];

    datesRange.map(date => DateUtils.convert(date)).forEach((date, index) => {
        const activityExist = runDays.indexOf(date) > -1;
        const lastItem = index === datesRange.length - 1;

        if (activityExist) {
            currentSet = [...currentSet, date];
        }

        if ((!activityExist || lastItem) && currentSet.length > 0) {
            sets = [...sets, [...currentSet]];
            currentSet = [];
        }
    });

    this.streakDays = sets[sets.length - 1].length;
    this.maxStreakDays = Math.max(...sets.map(set => set.length));
    this.maxStreakDates = sets.filter(set => set.length === this.maxStreakDays)
      .map(set => [new Date(set[0]), new Date(set[set.length - 1])]);
  }
}
