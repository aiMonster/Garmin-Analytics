import { IHeatmapConfigs } from "./heatmap-configs.interface";
import { IMonthlySummaryConfigs } from "./monthly-summary-configs.interface";
import { IStreakDaysConfigs } from "./streak-days-configs.interface";

export type WidgetConfigs = IHeatmapConfigs | IMonthlySummaryConfigs | IStreakDaysConfigs;
