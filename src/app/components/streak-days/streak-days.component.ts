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

  streakDays: number | undefined;
  maxStreakDays: number | undefined;
  maxStreakDates: [Date, Date][] = [];

  get getMaxStreakDatesFormatted(): string {
    return this.maxStreakDates
      .map(streakDates => DateUtils.formatDate(streakDates[0]) + ' - ' + DateUtils.formatDate(streakDates[1]))
      .join(', ');
  }
  
  constructor() { }

  ngOnInit(): void {
    this.calculateStreakDays();
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
