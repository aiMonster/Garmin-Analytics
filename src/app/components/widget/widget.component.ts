import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { WidgetLength } from 'src/app/enums/widget-length.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { IHeatmapConfigs } from 'src/app/interfaces/widget-configs/heatmap-configs.interface';
import { IMonthlySummaryConfigs } from 'src/app/interfaces/widget-configs/monthly-summary-configs.interface';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';
import { IWidgetPosition } from 'src/app/interfaces/widget-configs/widget-position.interface';
import { IWidgetSize } from 'src/app/interfaces/widget-configs/widget-size.interface';
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
  private readonly availableSizeOptions: {
    [key in WidgetType]: WidgetLength[]
  } = {
      [WidgetType.StreakDays]: [WidgetLength.OneColumn, WidgetLength.TwoColumns, WidgetLength.ThreeColumns],
      [WidgetType.Heatmap]: [WidgetLength.ThreeColumns],
      [WidgetType.MonthlySummary]: [WidgetLength.TwoColumns, WidgetLength.ThreeColumns]
    };

  private readonly ALL_YEARS_SELECTED_ID = -1;

  readonly widgetType: typeof WidgetType = WidgetType;

  @Input() configs: WidgetConfigs;

  @Input() widgetPositionChange: Observable<{
    widgetId: number,
    position: IWidgetPosition
  }>;

  @Output() removeWidget: EventEmitter<void> = new EventEmitter<void>();
  @Output() widgetSizeChange = new EventEmitter<IWidgetSize>();

  data: WidgetData;

  sizeOptions: WidgetLength[];

  selectedSize: WidgetLength = WidgetLength.ThreeColumns;

  yearOptions: {
    value: number,
    label: string
  }[] = [];

  selectedYears: number[] = [];

  /** Constructor */
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly settingsSevice: SettingsService
  ) { }

  ngOnInit(): void {
    this.selectedSize = this.configs.size.cols;
    this.sizeOptions = this.availableSizeOptions[this.configs.type];

    this.initActivities();
    this.setupWidgetHeight();

    this.widgetPositionChange
      .pipe(filter(item => item.widgetId === this.configs.id))
      .subscribe((item) => {
        this.configs = { ...this.configs, position: { ...item.position } };
        this.settingsSevice.udpateWidgetAsync(this.configs);
      });
  }

  /** On widget size changed */
  widgetSizeChanged(): void {
    this.emitSizeChange({ ...this.configs.size, cols: this.selectedSize });
    this.setupWidgetHeight();
  }

  /** On year options changed */
  yearOptionsChanged(event: any): void {
    // Not supported on Streak Days
    if (this.configs.type === WidgetType.StreakDays) {
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
      this.configs = { ...this.configs, yearsToDisplay: this.selectedYears };
    }

    this.settingsSevice.udpateWidgetAsync(this.configs).then(() => {
      this.initActivities();
      this.setupWidgetHeight();
    });
  }

  private initActivities(): void {
    switch (this.configs.type) {
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

  private setupWidgetHeight(): void {
    switch (this.configs.type) {
      case WidgetType.Heatmap:
        this.setupHeatmapHeight(this.configs.yearsToDisplay);
        break;
      case WidgetType.MonthlySummary:
        this.setupMonthlySummaryHeight(this.configs.yearsToDisplay, this.configs.size.cols);
        break;
      case WidgetType.StreakDays:
        this.setupStreakDaysHeight();
        break;
    }
  }

  private setupMonthlySummaryHeight(yearsToDisplay: number[], size: WidgetLength): void {
    const itemsCount = (!yearsToDisplay.length ? this.yearOptions.length - 1 : yearsToDisplay.length) || 1;

    const x2 = 20 + (itemsCount - 1) * 18;
    const x3 = 11 + (itemsCount - 1) * 9;

    const height = size === WidgetLength.ThreeColumns ? x3 : x2;

    this.emitSizeChange({ ...this.configs.size, rows: height });
  }

  private setupHeatmapHeight(yearsToDisplay: number[]): void {
    const itemsCount = (!yearsToDisplay.length ? this.yearOptions.length - 1 : yearsToDisplay.length) || 1;
    const height = 7 + (itemsCount - 1) * 4;

    this.emitSizeChange({ ...this.configs.size, rows: height });
  }

  private setupStreakDaysHeight(): void {
    const height = 6;

    this.emitSizeChange({ ...this.configs.size, rows: height });
  }

  private emitSizeChange(updatedSize: IWidgetSize): void {
    const sizeChanged = updatedSize.cols !== this.configs.size.cols || updatedSize.rows !== this.configs.size.rows;

    if (sizeChanged) {
      this.configs = { ...this.configs, size: updatedSize };
      this.widgetSizeChange.emit(updatedSize);
      this.settingsSevice.udpateWidgetAsync(this.configs);
    }
  }
}
