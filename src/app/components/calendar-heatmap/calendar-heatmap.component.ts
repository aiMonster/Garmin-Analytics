import { Component, Input, OnInit } from '@angular/core';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss']
})
export class CalendarHeatmapComponent {
  /** Months labels */
  readonly months = DateUtils.MonthsList;

  /** Calendars to display */
  @Input() calendars: IYearSummary[] = [];
}
