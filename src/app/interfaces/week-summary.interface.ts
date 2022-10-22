import { IDaySummary } from "./day-summary.interface";

export interface IWeekSummary {
  /** The summary by day */
  days: IDaySummary[]
}
