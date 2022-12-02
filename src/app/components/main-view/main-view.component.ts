import { Component, ViewEncapsulation } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { DialogService } from 'primeng/dynamicdialog';
import { ReplaySubject } from 'rxjs';
import { MAIN_GRID_CONFIGS } from 'src/app/consts/main-grid-configs.const';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';
import { IWidgetPosition } from 'src/app/interfaces/widget-configs/widget-position.interface';
import { IWidgetSize } from 'src/app/interfaces/widget-configs/widget-size.interface';
import { SettingsService } from 'src/app/services/settings.service';
import { CreateWidgetDialogComponent } from '../create-widget-dialog/create-widget-dialog.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {
  private widgetPositionChange = new ReplaySubject<{
    widgetId: number,
    position: IWidgetPosition
  }>(1);

  readonly gridOptions: GridsterConfig = {
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
    private readonly dialogService: DialogService
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

  openNewWidgetDialog(): void {
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
