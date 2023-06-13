import { ActivityType } from '../enums/activity-type.enum';

export const ActivityTypesMap: { [key: string]: ActivityType } = {
  Ride: ActivityType.Bike,
  Run: ActivityType.Run,
  Workout: ActivityType.Other,
  'Weight Training': ActivityType.Strength,
  Snowboard: ActivityType.Ski,
  Swim: ActivityType.Swimming,
  Kayaking: ActivityType.Kayak,
  'Alpine Ski': ActivityType.Ski,
  Hike: ActivityType.Hike,
  'Stand Up Paddling': ActivityType.Sup,
  Walk: ActivityType.Walk,
};
