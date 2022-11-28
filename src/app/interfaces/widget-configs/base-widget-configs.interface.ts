import { WidgetSize } from "src/app/enums/widget-size.enum";
import { IDataSourceConfigs } from "./data-source-configs.interface";

export interface IBaseWidgetConfigs extends IDataSourceConfigs {
  id?: number;
  title: string;
  size: WidgetSize;
}
