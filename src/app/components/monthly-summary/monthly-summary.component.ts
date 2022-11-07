import { Component, Input, OnInit } from '@angular/core';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
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

  // TODO: move to input
  timesGoal: number = 12;

  summaries: IYearSummary[];

  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}
  
  /** On Init */
  ngOnInit(): void {
    this.summaries = this.activitiesService.getYearSummaryInfo(this.criterias, this.showInDays);
  }
}
