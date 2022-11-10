import { CountType } from "src/app/enums/count-type.enum";
import { WidgetType } from "src/app/enums/widget-type.enum";
import { IBaseWidgetConfigs } from "./base-widget-configs.interface";

export interface IMonthlySummaryConfigs extends IBaseWidgetConfigs {
  type: WidgetType.MonthlySummary;
  countType: CountType;
  yearsToDisplay: number[];
  target?: number;
}
