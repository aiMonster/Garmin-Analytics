import { Pipe, PipeTransform } from '@angular/core';
import { ActivityType } from '../enums/activity-type.enum';

@Pipe({
  name: 'activityType',
})
export class ActivityTypePipe implements PipeTransform {
  private readonly activityTypeDisplay: { [key in ActivityType]: string } = {
    [ActivityType.Run]: 'Run',
    [ActivityType.Bike]: 'Bike',
    [ActivityType.Hike]: 'Hike',
    [ActivityType.Other]: 'Other',
    [ActivityType.MountainBike]: 'Mountain Bike',
    [ActivityType.Strength]: 'Strength',
    [ActivityType.Swimming]: 'Swimming',
    [ActivityType.Kayak]: 'Kayak',
    [ActivityType.Sup]: 'Sup',
    [ActivityType.Meditation]: 'Meditation',
    [ActivityType.Ski]: 'Ski',
    [ActivityType.Walk]: 'Walk',
  };

  transform(value: ActivityType): unknown {
    return this.activityTypeDisplay[value];
  }
}
