import { IMonthSummary } from "./month-summary.interface";
import { IWeekSummary } from "./week-summary.interface";

export interface IYearSummary {
    /** The year */
    year: number;

    /** The year summary */
    total: number;

    completedPercent: number;

    /** The summary by month */
    months: IMonthSummary[];

    /** The summary by week */
    weeks: IWeekSummary[];

    /** Days in the year */
    daysInYear: number;
}
