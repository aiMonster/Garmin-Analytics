import { WidgetLength } from "src/app/enums/widget-length.enum";

export interface IWidgetSize {
  /** Widget length */
  rows: WidgetLength;

  /** Widget height */
  cols: number;
}
