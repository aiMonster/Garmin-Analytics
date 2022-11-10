export interface IMonthSummary {
    /** Month index */
    index: number;

    /** Month summary */
    value: number;

    completedPercent: number;

    /** Days in month */
    daysInMonth: number;
}
