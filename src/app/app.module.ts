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
import { DockModule } from 'primeng/dock';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AboutUsDialogComponent } from './components/about-us-dialog/about-us-dialog.component';
import { LeaveReviewDialogComponent } from './components/leave-review-dialog/leave-review-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ImportDialogComponent } from './components/import-dialog/import-dialog.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ActivityTypePipe } from './pipes/activity-type.pipe';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    MonthlySummaryComponent,
    StreakDaysComponent,
    CalendarHeatmapComponent,
    ProgressCircleComponent,
    WidgetComponent,
    CreateWidgetDialogComponent,
    AboutUsDialogComponent,
    LeaveReviewDialogComponent,
    ImportDialogComponent,
    ActivityTypePipe,
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
    GridsterModule,
    DockModule,
    ProgressSpinnerModule,
    HttpClientModule,
    InputTextareaModule,
    ToastModule,
    FileUploadModule,
    TableModule,
    TooltipModule,
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
