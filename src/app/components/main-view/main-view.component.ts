import { Component } from '@angular/core';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { CountType } from 'src/app/enums/count-type.enum';
import { WidgetType } from 'src/app/enums/widget-type.enum';
import { WidgetConfigs } from 'src/app/interfaces/widget-configs/widget-configs.type';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  widgets: WidgetConfigs[] = [
    {
      title: 'Running',
      type: WidgetType.StreakDays,
      criterias: [{ activityType: ActivityType.Run }],
      targets: [7, 30, 100, 150, 200, 250, 300, 365]
    },
    {
      title: 'Running Months Summary',
      type: WidgetType.MonthlySummary,
      criterias: [{ activityType: ActivityType.Run }],
      countType: CountType.Days,
      yearsToDisplay: [2022]
    },
    {
      title: 'Running',
      type: WidgetType.Heatmap,
      criterias: [{ activityType: ActivityType.Run }],
      countType: CountType.Days,
      yearsToDisplay: [2022]
    },
    {
      title: 'Contrast Shower',
      type: WidgetType.Heatmap,
      criterias: [{
        activityType: ActivityType.Other,
        nameLike: "Contrast Shower"
      }],
      countType: CountType.Days,
      yearsToDisplay: [2022]
    },
    {
      title: 'Strength',
      type: WidgetType.Heatmap,
      criterias: [{ activityType: ActivityType.Strength }],
      countType: CountType.Days,
      yearsToDisplay: [2022]
    },
    {
      title: 'Strength Months Summary',
      type: WidgetType.MonthlySummary,
      criterias: [{ activityType: ActivityType.Strength }],
      countType: CountType.Times,
      target: 12,
      yearsToDisplay: [2022]
    },
    {
      title: 'Meditation',
      type: WidgetType.Heatmap,
      criterias: [{ activityType: ActivityType.Meditation }],
      countType: CountType.Days,
      yearsToDisplay: [2022]
    }
  ];
}
