import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from 'src/app/interfaces/activity.interface';
import { IMonthSummary } from 'src/app/interfaces/month-summary.interface';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';

@Component({
  selector: 'app-years-summary',
  templateUrl: './years-summary.component.html',
  styleUrls: ['./years-summary.component.scss']
})
export class YearsSummaryComponent implements OnInit {
  readonly months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  @Input() activities: IActivity[] = [];

  summaries: IYearSummary[] = [];

  constructor() { }

  ngOnInit(): void {
    this.summaries = this.mapActivities(this.activities);
  }

  private mapActivities(activities: IActivity[]): IYearSummary[] {
    const firstDate = new Date(activities[activities.length - 1].startTimeLocal);
    const lastDate = new Date(activities[0].startTimeLocal);

    const yearsSummary = this.getYearsTemplate(firstDate, lastDate);

    activities.forEach(activity => {
      const date = activity.startTimeLocal.split(' ')[0];
      const activityYear = +date.split('-')[0];
      const activityMonth = +date.split('-')[1] - 1;

      const yearSummary = yearsSummary.find(yearSummary => yearSummary.year === activityYear);
      yearSummary!.total += 1;
      yearSummary!.months.find(month => month.index === activityMonth)!.value += 1;
    });

    return yearsSummary;
  }

  private getYearsTemplate(firstDate: Date, lastDate: Date): IYearSummary[] {
    const summaries: IYearSummary[] = [];
    let currentYear = firstDate.getFullYear();

    do {
      const yearSummary: IYearSummary = {
        total: 0,
        year: currentYear,
        months: this.getMonthTemplate(currentYear)
      }

      summaries.push(yearSummary);
    } while(currentYear++ < lastDate.getFullYear());

    return summaries;
  }

  private getMonthTemplate(year: number): IMonthSummary[] {
    return Array.from({length: 12}, (x, i) => ({
      index: i,
      value: 0,
      daysInMonth: new Date(year, i + 1, 0).getDate()
    }));
  }
}
