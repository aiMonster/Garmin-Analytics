import { Component, Input, OnInit } from '@angular/core';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { IActivity } from 'src/app/interfaces/activity.interface';
import { IMonthSummary } from 'src/app/interfaces/month-summary.interface';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.scss']
})
export class MonthlySummaryComponent implements OnInit {
  readonly months = DateUtils.MonthsFullList;
  
  @Input() showInDays: boolean = false;

  /** Criteria of activities to process */
  @Input() criterias: IActivityCriteria[];

  summaries: IYearSummary[];

  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}
  
  /** On Init */
  ngOnInit(): void {
    this.summaries = this.activitiesService.getMonthlySummaryInfo(this.criterias, this.showInDays);
  }
}
