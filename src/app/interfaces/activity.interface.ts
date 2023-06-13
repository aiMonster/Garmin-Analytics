import { ActivityType } from '../enums/activity-type.enum';

export interface IActivity {
  /** The activity Name */
  activityName: string;

  /** The activity Type */
  activityType: {
    typeId: ActivityType;
  };

  /** The activity time in format 'YYYY-MM-DD HH:MM:SS' */
  startTimeLocal: string;
}
