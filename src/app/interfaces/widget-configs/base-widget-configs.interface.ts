import { IDataSourceConfigs } from "./data-source-configs.interface";
import { IWidgetPosition } from "./widget-position.interface";
import { IWidgetSize } from "./widget-size.interface";

export interface IBaseWidgetConfigs extends IDataSourceConfigs {
  id?: number;
  title: string;
  size: IWidgetSize;
  position: IWidgetPosition;
}
