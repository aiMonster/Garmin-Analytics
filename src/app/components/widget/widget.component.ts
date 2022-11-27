import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CountType } from 'src/app/enums/count-type.enum';
import { WidgetSize } from 'src/app/enums/widget-size.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { IHeatmapConfigs } from 'src/app/interfaces/widget-configs/heatmap-configs.interface';
import { IMonthlySummaryConfigs } from 'src/app/interfaces/widget-configs/monthly-summary-configs.interface';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';
import { WidgetData } from 'src/app/interfaces/widget-data.type';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetComponent implements OnInit {
  private readonly ALL_YEARS_SELECTED_ID = -1;

  readonly widgetType: typeof WidgetType = WidgetType;

  @Input() configs: WidgetConfigs;

  @Output() removeWidget: EventEmitter<void> = new EventEmitter<void>();

  data: WidgetData;

  sizeOptions: WidgetSize[] = [
    WidgetSize.OneColumn,
    WidgetSize.TwoColumns,
    WidgetSize.ThreeColumns
  ];

  selectedSize: WidgetSize = WidgetSize.ThreeColumns;

  yearOptions: {
    value: number,
    label: string
  }[] = [];

  selectedYears: number[] = [];

  /** Constructor */
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly settingsSevice: SettingsService
  ) {}

  ngOnInit(): void {
    this.initActivities();
  }

  yearOptionsChanged(event: any): void {
    // Not supported on Streak Days
    if (this.configs.type === WidgetType.StreakDays){
      return;
    }

    // Doesn't allow to unselect all items
    if (this.selectedYears.length === 0) {
      this.selectedYears = [event.option.value];
      return;
    }

    const allSelected = event.option.value === this.ALL_YEARS_SELECTED_ID && this.selectedYears.includes(this.ALL_YEARS_SELECTED_ID);

    if (allSelected) {
      this.selectedYears = [this.ALL_YEARS_SELECTED_ID];
      this.configs = { ...this.configs, yearsToDisplay: [] };
    } else {
      this.selectedYears = this.selectedYears.filter(selected => selected !== this.ALL_YEARS_SELECTED_ID);
      this.configs = {...this.configs, yearsToDisplay: this.selectedYears };
    }

    this.settingsSevice.udpateWidgetAsync(this.configs).then(() => {
      this.initActivities();
    });
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
    const summaryInfo = this.activitiesService.getYearSummaryInfo(configs.criterias, configs.countType);

    this.data = summaryInfo
      .filter((summary) => configs.yearsToDisplay.length ? configs.yearsToDisplay.includes(summary.year) : true);

    this.setupYearOptions(summaryInfo);
    this.setSelectedYearsOptions(configs.yearsToDisplay);
  }

  private setupMonthlySummaryData(configs: IMonthlySummaryConfigs): void {
    const summaryInfo = this.activitiesService.getYearSummaryInfo(configs.criterias, configs.countType, configs.target);

    this.data = summaryInfo
      .filter((summary) => configs.yearsToDisplay.length ? configs.yearsToDisplay.includes(summary.year) : true);

    this.setupYearOptions(summaryInfo);
    this.setSelectedYearsOptions(configs.yearsToDisplay);
  }

  private setSelectedYearsOptions(yearsToDisplay: number[]): void {
    this.selectedYears = yearsToDisplay.length
      ? yearsToDisplay : [this.ALL_YEARS_SELECTED_ID];
  }

  private setupYearOptions(yearSummaries: IYearSummary[]) {
    this.yearOptions = [
      { label: 'ALL', value: this.ALL_YEARS_SELECTED_ID },
      ...yearSummaries.map((summary) => ({ label: summary.year.toString(), value: summary.year })).reverse()
    ];
  }
}
