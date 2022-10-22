import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from 'src/app/interfaces/activity.interface';
import { IDaySummary } from 'src/app/interfaces/day-summary.interface';
import { IWeekSummary } from 'src/app/interfaces/week-summary.interface';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss']
})
export class CalendarHeatmapComponent implements OnInit {
  /** List of all activities */
  @Input() activities: IActivity[] = [];

  /** Months labels */
  readonly months = DateUtils.MonthsList;

  /** List of dates with activities */
  private activitesDates: string[] = [];

  /** Calendars to display */
  calendars: IWeekSummary[][] = [];

  /** On Init */
  ngOnInit(): void {
    this.activitesDates = this.activities.map(activity => activity.startTimeLocal.split(' ')[0]);

    this.setupCalendarData();
  }

  /** Setup calendars data */
  private setupCalendarData(): void {
    const startYear = new Date(this.activities[this.activities.length - 1].startTimeLocal).getFullYear();
    const endYear = new Date(this.activities[0].startTimeLocal).getFullYear();

    this.calendars = [this.getYearTotals(endYear)];

    // for(let current = endYear; current >= startYear; current--) {
    //   this.calendars = [...this.calendars, this.getYearTotals(current)];
    // }
  }

  /** Setup one year totals */
  private getYearTotals(year: number): IWeekSummary[] {
    const yearDates = DateUtils.getAllDatesInTheRange(new Date(year, 0, 1), new Date(year, 11, 31));

    var yearSummary: IWeekSummary[] = [];
    var weekSummary: IDaySummary[] = [];

    yearDates.forEach((date: Date, index: number) => {
      // If new week started
      if (date.getDay() === 1 && weekSummary.length > 0) {
        yearSummary = [...yearSummary, { days: [...weekSummary] }];
        weekSummary = [];
      }

      const activitiesCount = this.activitesDates.filter(activityDate => activityDate === DateUtils.convert(date)).length;
      weekSummary = [...weekSummary, { activitiesCount, dateTooltip: DateUtils.formatDate(date) }];

      // If the last item has been added
      if (index === yearDates.length - 1) {
        yearSummary = [...yearSummary,{ days: [...weekSummary] }];
      }
    });

    return yearSummary;
  }
}
