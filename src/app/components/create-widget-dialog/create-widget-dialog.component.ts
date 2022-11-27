import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { CountType } from 'src/app/enums/count-type.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { IBaseWidgetConfigs } from 'src/app/interfaces/widget-configs/base-widget-configs.interface';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';

@Component({
  selector: 'app-create-widget-dialog',
  templateUrl: './create-widget-dialog.component.html',
  styleUrls: ['./create-widget-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateWidgetDialogComponent implements OnInit {

  readonly widgetType = WidgetType;
  readonly countType = CountType;
  readonly widgetTypes: WidgetType[] = Object.values(WidgetType).filter(value => !isNaN(Number(value))).map(value => +value);

  readonly activityTypes: {
    value: ActivityType,
    label: string
  }[] = [
    { value: ActivityType.Run, label: 'Running' },
    { value: ActivityType.Strength, label: 'Strength' },
    { value: ActivityType.Meditation, label: 'Meditation' },
    { value: ActivityType.Bike, label: 'Bike' },
    { value: ActivityType.Swimming, label: 'Swimming' },
    { value: ActivityType.Other, label: 'Other' }
  ];

  readonly countTypes: {
    value: CountType,
    label: string
  }[] = [
    { value: CountType.Days, label: 'Days' },
    { value: CountType.Times, label: 'Times' }
  ];

  /** Selected widget type */
  selectedType: WidgetType = WidgetType.Heatmap;

  /** Selected widget title */
  selectedTitle: string;

  /** Selected widget criterias */
  selectedCriterias: IActivityCriteria[] = [
    { activityType: ActivityType.Run }
  ];

  /** Selected targets for Streak Days widget */
  selectedTargets: number[] = [3, 7, 14];
  enteredTarget: number | null;

  /** Selected count type */
  selectedCountType: CountType = CountType.Days;

  /** Selected target times for Monthly Summary */
  selectedTargetTimes: number;

  constructor(private readonly ref: DynamicDialogRef) { }

  ngOnInit(): void {

  }

  removeTarget(index: number): void {
    this.selectedTargets.splice(index, 1);
  }

  addTarget() {
    this.selectedTargets = [
      ...this.selectedTargets, this.enteredTarget!
    ];

    this.enteredTarget = null;
  }

  removeCriteria(index: number): void {
    this.selectedCriterias.splice(index, 1);
  }

  addNewCriteria(): void {
    this.selectedCriterias = [
      ...this.selectedCriterias,
      { activityType: ActivityType.Run }
    ];
  }

  changeWidgetType(type: WidgetType): void {
    if (this.selectedType !== type) {
      this.selectedType = type;
    }
  }

  saveWidget(): void {
    const widgetConfigs: WidgetConfigs = {
      title: this.selectedTitle,
      type: this.selectedType,
      criterias: this.selectedCriterias,
      targets: this.selectedTargets,
      countType: this.selectedCountType,
      yearsToDisplay: [],
      target: this.selectedTargetTimes
    };

    this.ref.close(widgetConfigs);
  }
}
