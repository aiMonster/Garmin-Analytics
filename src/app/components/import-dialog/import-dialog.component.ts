import { Component, OnInit, ViewChild } from '@angular/core';

import { FileUpload } from 'primeng/fileupload';
import { IActivity } from 'src/app/interfaces/activity.interface';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { DateUtils } from 'src/app/utils/date.utils';
import { SettingsService } from 'src/app/services/settings.service';
import timezones from 'timezones-list';
import { ActivityTypesMap } from 'src/app/consts/acitvity-types-map.const';
import { IImportedActivity } from 'src/app/interfaces/imported-activity.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
})
export class ImportDialogComponent implements OnInit {
  @ViewChild(FileUpload) fileUpload!: FileUpload;

  existingActivities: IActivity[] = [];
  uploadedActivities: IImportedActivity[] = [];

  readonly timeZones = timezones;

  selectedTimeZone: {
    label: string;
    tzCode: string;
  };

  private _selectedActivities: IImportedActivity[] = [];

  get selectedActivities(): IImportedActivity[] {
    return this._selectedActivities;
  }

  set selectedActivities(value: IImportedActivity[]) {
    this._selectedActivities = value;
    this.duplicatesCount = value.filter((a) => a.duplicate).length;
  }

  duplicatesCount: number;

  constructor(
    private readonly ngxCsvParser: NgxCsvParser,
    private readonly settingsService: SettingsService,
    private readonly ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.settingsService
      .getActivitiesAsync()
      .then((activities: IActivity[]) => {
        this.existingActivities = activities;
      });

    // this.existingActivities = [
    //   {
    //     startTimeLocal: '2019-05-17 05:50:14',
    //     activityName: 'Some Name',
    //     activityType: {
    //       typeId: 0,
    //     },
    //   },
    //   {
    //     startTimeLocal: '2019-05-19 06:16:20',
    //     activityName: 'Some Name',
    //     activityType: {
    //       typeId: 0,
    //     },
    //   },
    // ];
  }

  onFileUploaded(event: { currentFiles: File[] }): void {
    this.ngxCsvParser
      .parse(event.currentFiles[0], {
        header: true,
        delimiter: ',',
        encoding: 'utf8',
      })
      .subscribe({
        next: (result: any[] | NgxCSVParserError): void => {
          this.setupActivities(result as any[]);
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        },
      });
  }

  importSelected(): void {
    this.settingsService.insertActivitiesAsync(
      this.selectedActivities.map((ia) => ({
        startTimeLocal: ia.startTimeLocal,
        activityName: ia.activityName,
        activityType: ia.activityType,
      }))
    );

    this.ref.close({ imported: true });
  }

  timeZoneChanged(): void {
    this.uploadedActivities.forEach((activity) => {
      const dateString = activity.utcDate
        .toLocaleString('en-GB', {
          timeZone: this.selectedTimeZone.tzCode,
        })
        .replace(/[\/,:]/g, '-');

      const parts = dateString.split('-');
      const startTimeLocal = `${parts[2]}-${parts[1]}-${parts[0]} ${parts[3]}:${parts[4]}:${parts[5]}`;

      activity.startTimeLocal = startTimeLocal;
    });
  }

  private setupActivities(result: {}[]): void {
    this.uploadedActivities = result
      .map((record: any) => {
        const utcDate = this.mapToUtcDate(record['Activity Date']);
        const startTimeLocal = DateUtils.convertFull(utcDate);

        return {
          activityName: record['Activity Name'],
          activityType: {
            typeId: ActivityTypesMap[record['Activity Type']],
          },
          startTimeLocal,
          utcDate,
          duplicate: this.existingActivities.some((activity) =>
            this.isDateDuplicate(activity.startTimeLocal, startTimeLocal)
          ),
        };
      })
      .sort((a, b) => (a.startTimeLocal > b.startTimeLocal ? 1 : -1));

    this.selectedActivities = this.uploadedActivities.filter(
      (a) => !a.duplicate
    );
  }

  private isDateDuplicate(a: string, b: string): boolean {
    const datesEqual = a.split(' ')[0] === b.split(' ')[0];
    const secondsEqual =
      a.split(' ')[1].split(':')[2] === b.split(' ')[1].split(':')[2];

    return datesEqual && secondsEqual;
  }

  private mapToUtcDate(date: string): Date {
    const originalDate = new Date(date);

    return new Date(
      Date.UTC(
        originalDate.getFullYear(),
        originalDate.getMonth(),
        originalDate.getDate(),
        originalDate.getHours(),
        originalDate.getMinutes(),
        originalDate.getSeconds()
      )
    );
  }
}
