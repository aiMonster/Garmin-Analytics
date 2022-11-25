import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';
import { SettingsService } from 'src/app/services/settings.service';
import { CreateWidgetDialogComponent } from '../create-widget-dialog/create-widget-dialog.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  widgets: WidgetConfigs[];

  constructor(
    private readonly settingsSevice: SettingsService,
    private readonly dialogService: DialogService
  ) { }

  ngOnInit() {
    this.settingsSevice.getAllWidgetsAsync().then(widgets => {
      this.widgets = widgets;
    });
  }

  removeWidget(id: number): void {
    this.settingsSevice.removeWidgetAsync(id).then(() => {
      this.widgets = this.widgets.filter((widget) => widget.id !== id);
    });
  }

  openNewWidgetDialog(): void {
    const dialogRef = this.dialogService.open(CreateWidgetDialogComponent, {
      header: 'Create new widget'
    });

    dialogRef.onClose.subscribe((result: WidgetConfigs | undefined) => {
      if (result) {
        this.settingsSevice.addWidgetAsync(result).then((id) => {
          this.widgets = [
            ...this.widgets,
            { ...result, id }
          ]
        });
      }
    })
  }
}
