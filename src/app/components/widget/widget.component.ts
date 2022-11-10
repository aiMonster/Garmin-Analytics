import { Component, Input, OnInit } from '@angular/core';
import { CountType } from 'src/app/enums/count-type.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';
import { WidgetData } from 'src/app/interfaces/widget-data.type';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  readonly widgetType: typeof WidgetType = WidgetType;

  @Input() configs: WidgetConfigs;

  data: WidgetData;

  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.initActivities();
  }

  private initActivities(): void {
    switch(this.configs.type){
      case WidgetType.Heatmap:
        this.data = this.activitiesService.getYearSummaryInfo(this.configs.criterias, this.configs.countType);
        break;
      case WidgetType.MonthlySummary:
        this.data = this.activitiesService.getYearSummaryInfo(this.configs.criterias, this.configs.countType, this.configs.target);
        break;
      case WidgetType.StreakDays:
        this.data = this.activitiesService.getStreakDaysInfo(this.configs.criterias);
        break;
    }
  }
}
