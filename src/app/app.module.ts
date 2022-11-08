import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { MonthlySummaryComponent } from './components/monthly-summary/monthly-summary.component';
import { StreakDaysComponent } from './components/streak-days/streak-days.component';
import { CalendarHeatmapComponent } from './components/calendar-heatmap/calendar-heatmap.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { WidgetComponent } from './components/widget/widget.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    MonthlySummaryComponent,
    StreakDaysComponent,
    CalendarHeatmapComponent,
    ProgressCircleComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
