import { Component, Input, OnInit } from '@angular/core';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss']
})
export class CalendarHeatmapComponent implements OnInit {
  /** Criteria of activities to process */
  @Input() criterias: IActivityCriteria[];

  /** Months labels */
  readonly months = DateUtils.MonthsList;

  /** Calendars to display */
  calendars: IYearSummary[] = [];

  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}

  /** On Init */
  ngOnInit(): void {
    this.calendars = this.activitiesService.getYearSummaryInfo(this.criterias, false);
  }
}
