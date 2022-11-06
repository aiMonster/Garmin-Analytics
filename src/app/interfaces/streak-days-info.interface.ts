
/**
 *  Streak Days Info
 */
export interface IStreakDaysInfo {
  /** Current streak days value */
  current: number;

  /** Maximum streak days value */
  max: number;

  /** Maximum streak days dates */
  maxDates: {
    /** Start date of max streak row */
    start: Date;

    /** End date of max streak row */
    end: Date;
  }[];
}