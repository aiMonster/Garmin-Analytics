import { WidgetType } from "src/app/enums/widget-type.enum";
import { IDataSourceConfigs } from "./data-source-configs.interface";

export interface IBaseWidgetConfigs extends IDataSourceConfigs {
  title: string;
}
