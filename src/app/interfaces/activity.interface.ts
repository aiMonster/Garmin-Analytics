import { ActivityType } from "../enums/activity-type.enum";

export interface IActivity {
    /** The activity Name */
    activityName: string;

    /** The activity Type */
    activityType: {
        typeId: ActivityType;
    };

    /** The activity time in format 'YYYY-MM-DD HH:MM:SS' */
    startTimeLocal: string;

    /** The activity end latitude */
    endLatitude?: number;

    /** The activity end longitude */
    endLongitude?: number;

    /** The activity distance in meters */
    distance?: number;
}
