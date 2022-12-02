import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { MonthlySummaryComponent } from './components/monthly-summary/monthly-summary.component';
import { StreakDaysComponent } from './components/streak-days/streak-days.component';
import { CalendarHeatmapComponent } from './components/calendar-heatmap/calendar-heatmap.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { WidgetComponent } from './components/widget/widget.component';
import { ButtonModule } from 'primeng/button';
import { CreateWidgetDialogComponent } from './components/create-widget-dialog/create-widget-dialog.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    MonthlySummaryComponent,
    StreakDaysComponent,
    CalendarHeatmapComponent,
    ProgressCircleComponent,
    WidgetComponent,
    CreateWidgetDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    DropdownModule,
    ScrollPanelModule,
    InputNumberModule,
    SelectButtonModule,
    GridsterModule
  ],
  providers: [
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
