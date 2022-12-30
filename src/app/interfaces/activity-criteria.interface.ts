import { ActivityType } from "../enums/activity-type.enum";

/**
 * Activity Search Criteria
 */
export interface IActivityCriteria {
  /** Activity Name */
  activityType: ActivityType;

  /** Activity name template */
  nameLike?: string | undefined;
}
