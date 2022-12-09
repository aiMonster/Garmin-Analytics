import { Component, ViewEncapsulation } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ReplaySubject } from 'rxjs';
import { MAIN_GRID_CONFIGS } from 'src/app/consts/main-grid-configs.const';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';
import { IWidgetPosition } from 'src/app/interfaces/widget-configs/widget-position.interface';
import { IWidgetSize } from 'src/app/interfaces/widget-configs/widget-size.interface';
import { SettingsService } from 'src/app/services/settings.service';
import { AboutUsDialogComponent } from '../about-us-dialog/about-us-dialog.component';
import { CreateWidgetDialogComponent } from '../create-widget-dialog/create-widget-dialog.component';
import { LeaveReviewDialogComponent } from '../leave-review-dialog/leave-review-dialog.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {
  private widgetPositionChange = new ReplaySubject<{
    widgetId: number,
    position: IWidgetPosition
  }>(1);

  readonly menuItems: MenuItem[] = [
    {
      label: 'Add widget',
      icon: 'assets/icons/add-widget.png',
      command: () => this.openNewWidgetDialog(),
      tooltipOptions: {
        tooltipLabel: 'Add widget',
        tooltipPosition: 'top',
        positionTop: -5
      }
    },
    {
      label: 'Leave a feedback',
      icon: 'assets/icons/feedback.png',
      command: () => this.openReviewDialog(),
      tooltipOptions: {
        tooltipLabel: 'Leave a feedback',
        tooltipPosition: 'top',
        positionTop: -5
      }
    },
    {
      label: 'About us',
      icon: 'assets/icons/about-us.png',
      command: () => this.openAboutUsDialog(),
      tooltipOptions: {
        tooltipLabel: 'About us',
        tooltipPosition: 'top',
        positionTop: -5
      }
    }
  ];

  gridOptions: GridsterConfig = {
    ...MAIN_GRID_CONFIGS,
    itemChangeCallback: (item) => this.onItemPositionChanged(item)
  };

  /** Collection of widgets */
  widgets: WidgetConfigs[];

  /** Dictionary of widgets position */
  widgetPosition: { [key: number]: GridsterItem } = {};

  /** Widget position change observable */
  widgetPositionChange$ = this.widgetPositionChange.asObservable();

  /** Constructor */
  constructor(
    private readonly settingsSevice: SettingsService,
    private readonly dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  /** On Init */
  ngOnInit() {
    this.settingsSevice.getAllWidgetsAsync().then(widgets => {
      widgets.forEach((widget) => {
        this.widgetPosition[widget.id!] = this.mapWidgetPosition(widget);
      });

      this.widgets = widgets;
    });
  }

  removeWidget(id: number): void {
    this.settingsSevice.removeWidgetAsync(id).then(() => {
      this.widgets = this.widgets.filter((widget) => widget.id !== id);
    });
  }

  widgetSizeChange(id: number, newSize: IWidgetSize): void {
    this.widgetPosition[id] = {
      ...this.widgetPosition[id],
      ...newSize
    };
  }

  private openReviewDialog(): void {
    this.dialogService.open(LeaveReviewDialogComponent, {
      header: 'Leave a feedback'
    }).onClose.subscribe((success) => {
      if (success) {
        this.messageService.add({ severity:'success', summary:'Success', detail: 'Your review has been submitted' });
      }
    });
  }

  private openAboutUsDialog(): void {
    this.dialogService.open(AboutUsDialogComponent, {
      header: 'About us'
    });
  }

  private openNewWidgetDialog(): void {
    this.updateGridScrollOptions();
    
    const dialogRef = this.dialogService.open(CreateWidgetDialogComponent, {
      header: 'Create new widget'
    });

    dialogRef.onClose.subscribe((result: WidgetConfigs | undefined) => {
      if (result) {
        this.settingsSevice.addWidgetAsync(result).then((id) => {
          const newWidget: WidgetConfigs = { ...result, id };

          this.widgetPosition[id] = this.mapWidgetPosition(newWidget);
          this.widgets = [...this.widgets, newWidget];
        });
      }
    });
  }
  
  private updateGridScrollOptions(): void {
    if (this.gridOptions.scrollToNewItems) {
      return;
    }

    this.gridOptions = {
      ...this.gridOptions,
      scrollToNewItems: true
    };

    if (this.gridOptions.api && this.gridOptions.api.optionsChanged) {
      this.gridOptions.api.optionsChanged();
    }
  }

  private onItemPositionChanged(item: GridsterItem): void {
    this.widgetPositionChange.next({
      widgetId: item['widgetId'],
      position: { x: item.x, y: item.y }
    });
  }

  private mapWidgetPosition(widget: WidgetConfigs): GridsterItem {
    return {
      widgetId: widget.id,
      x: widget.position.x,
      y: widget.position.y,
      cols: widget.size.cols,
      rows: widget.size.rows
    };
  }
}
