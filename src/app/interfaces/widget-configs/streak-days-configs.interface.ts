import { WidgetType } from "src/app/enums/widget-type.enum";
import { IBaseWidgetConfigs } from "./base-widget-configs.interface";

export interface IStreakDaysConfigs extends IBaseWidgetConfigs {
  type: WidgetType.StreakDays;
  targets: number[];
}
