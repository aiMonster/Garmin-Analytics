import { IMonthSummary } from "./month-summary.interface";

export interface IYearSummary {
    /** The year */
    year: number;

    /** The year summary */
    total: number;

    /** The summary by month */
    months: IMonthSummary[]

    /** Days in the year */
    daysInYear: number;
}
