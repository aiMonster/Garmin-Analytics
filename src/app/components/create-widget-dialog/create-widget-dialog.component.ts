import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { CountType } from 'src/app/enums/count-type.enum';
import { WidgetLength } from 'src/app/enums/widget-length.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { IActivityCriteria } from 'src/app/interfaces/activity-criteria.interface';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';

@Component({
  selector: 'app-create-widget-dialog',
  templateUrl: './create-widget-dialog.component.html',
  styleUrls: ['./create-widget-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateWidgetDialogComponent implements OnInit {
  readonly maxStreakTargets = 8;
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
      { value: ActivityType.MountainBike, label: 'Mountain Bike' },
      { value: ActivityType.Hike, label: 'Hike' },
      { value: ActivityType.Kayak, label: 'Kayak' },
      { value: ActivityType.Sup, label: 'Sup' },
      { value: ActivityType.Ski, label: 'Ski' },
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
    { 
      activityType: ActivityType.Run
    }
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

  addTarget(): void {
    if (!this.enteredTarget) {
      return;
    }

    this.selectedTargets = [
      ...this.selectedTargets, this.enteredTarget!
    ].sort((a, b) => a - b);

    this.enteredTarget = null;
  }

  removeCriteria(index: number): void {
    this.selectedCriterias.splice(index, 1);
  }

  updateLocationLatitude(index: number, value: number): void {
    if (!this.selectedCriterias[index].nearLocation) {
      this.selectedCriterias[index].nearLocation = { latitude: value, longitude: 0, radiusMeters: 50 };
    } else {
      this.selectedCriterias[index].nearLocation!.latitude = value;
    }
  }

  updateLocationLongitude(index: number, value: number): void {
    if (!this.selectedCriterias[index].nearLocation) {
      this.selectedCriterias[index].nearLocation = { latitude: 0, longitude: value, radiusMeters: 50 };
    } else {
      this.selectedCriterias[index].nearLocation!.longitude = value;
    }
  }

  updateLocationRadius(index: number, value: number): void {
    if (this.selectedCriterias[index].nearLocation) {
      this.selectedCriterias[index].nearLocation!.radiusMeters = value;
    }
  }

  getMinDistanceKm(index: number): number | undefined {
    const meters = this.selectedCriterias[index].minDistanceMeters;
    return meters !== undefined && meters !== null ? meters / 1000 : undefined;
  }

  updateMinDistance(index: number, valueKm: number): void {
    if (valueKm !== undefined && valueKm !== null && valueKm > 0) {
      this.selectedCriterias[index].minDistanceMeters = valueKm * 1000;
    } else {
      this.selectedCriterias[index].minDistanceMeters = undefined;
    }
  }

  addNewCriteria(): void {
    this.selectedCriterias = [
      ...this.selectedCriterias,
      { 
        activityType: ActivityType.Run
      }
    ];
  }

  changeWidgetType(type: WidgetType): void {
    if (this.selectedType !== type) {
      this.selectedType = type;
    }
  }

  saveWidget(): void {
    // Clean up criteria before saving - remove location filter if not fully configured
    const cleanedCriterias = this.selectedCriterias.map(criteria => {
      const cleaned = { ...criteria };
      
      // Remove location filter if latitude or longitude is not set (or is 0)
      if (!cleaned.nearLocation?.latitude || !cleaned.nearLocation?.longitude) {
        delete cleaned.nearLocation;
      }

      // Remove minDistanceMeters if not set or is 0
      if (!cleaned.minDistanceMeters || cleaned.minDistanceMeters <= 0) {
        delete cleaned.minDistanceMeters;
      }
      
      return cleaned;
    });

    const widgetConfigs: WidgetConfigs = {
      size: {
        rows: 0,
        cols: WidgetLength.ThreeColumns
      },
      position: {
        x: 0,
        y: 0
      },
      title: this.selectedTitle,
      type: this.selectedType,
      criterias: cleanedCriterias,
      targets: this.selectedTargets,
      countType: this.selectedCountType,
      yearsToDisplay: [],
      target: this.selectedTargetTimes
    };

    this.ref.close(widgetConfigs);
  }
}
