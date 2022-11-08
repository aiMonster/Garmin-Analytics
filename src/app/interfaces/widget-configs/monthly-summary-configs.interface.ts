import { CountType } from "src/app/enums/count-type.enum";
import { IBaseWidgetConfigs } from "./base-widget-configs.interface";

export interface IMonthlySummaryConfigs extends IBaseWidgetConfigs {
  countType: CountType;
}
