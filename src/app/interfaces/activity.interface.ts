import { ActivityType } from "../enums/activity-type.enum";

export interface IActivity {
    activityName: string;
    activityType: {
        typeId: ActivityType;
    };
    startTimeLocal: Date; // TODO: Probably change to string
}
