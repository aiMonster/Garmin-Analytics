import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountType } from 'src/app/enums/count-type.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { IHeatmapConfigs } from 'src/app/interfaces/widget-configs/heatmap-configs.interface';
import { IMonthlySummaryConfigs } from 'src/app/interfaces/widget-configs/monthly-summary-configs.interface';
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

  @Output() removeWidget: EventEmitter<void> = new EventEmitter<void>();

  data: WidgetData;

  /** Constructor */
  constructor(private readonly activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.initActivities();
  }

  private initActivities(): void {
    switch(this.configs.type){
      case WidgetType.Heatmap:
        this.setupHeatmapData(this.configs);
        break;
      case WidgetType.MonthlySummary:
        this.setupMonthlySummaryData(this.configs);
        break;
      case WidgetType.StreakDays:
        this.data = this.activitiesService.getStreakDaysInfo(this.configs.criterias);
        break;
    }
  }

  private setupHeatmapData(configs: IHeatmapConfigs): void {
    this.data = this.activitiesService.getYearSummaryInfo(configs.criterias, configs.countType)
      .filter((summary) => configs.yearsToDisplay.length ? configs.yearsToDisplay.includes(summary.year) : true);
  }

  private setupMonthlySummaryData(configs: IMonthlySummaryConfigs): void {
    this.data = this.activitiesService.getYearSummaryInfo(configs.criterias, configs.countType, configs.target)
      .filter((summary) => configs.yearsToDisplay.length ? configs.yearsToDisplay.includes(summary.year) : true);
  }
}
