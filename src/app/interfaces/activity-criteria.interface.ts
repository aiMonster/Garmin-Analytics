import { ActivityType } from "../enums/activity-type.enum";

/**
 * Activity Search Criteria
 */
export interface IActivityCriteria {
  /** Activity Name */
  activityType: ActivityType;

  /** Activity name template */
  nameLike?: string | undefined;

  /** Location filter - lat,lng,radius in meters */
  nearLocation?: {
    latitude: number;
    longitude: number;
    radiusMeters: number;
  } | undefined;

  /** Minimum distance filter in meters */
  minDistanceMeters?: number | undefined;

  /** Minimum start time filter in HH:MM format */
  minStartTime?: string | undefined;
}
