import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { YearsSummaryComponent } from './components/years-summary/years-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    YearsSummaryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
