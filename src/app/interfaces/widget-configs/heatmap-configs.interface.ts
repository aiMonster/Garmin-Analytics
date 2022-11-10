import { CountType } from "src/app/enums/count-type.enum";
import { WidgetType } from "src/app/enums/widget-type.enum";
import { IBaseWidgetConfigs } from "./base-widget-configs.interface";

export interface IHeatmapConfigs extends IBaseWidgetConfigs {
  type: WidgetType.Heatmap;
  countType: CountType;
}
