import { Injectable } from '@angular/core';
import { IActivityCriteria } from '../interfaces/activity-criteria.interface';
import { IActivity } from '../interfaces/activity.interface';
import { IStreakDaysInfo } from '../interfaces/streak-days-info.interface';
import { DateUtils } from '../utils/date.utils';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private activities: IActivity[];

  /**
   * Inits all activities
   * @param activities activities list
   */
  public initActivities(activities: IActivity[]): void {
    this.activities = activities;
  }

  /**
   * Get Streak Days info for specified type of activities
   * @param searchCriterias creatria for activities to process
   * @returns streak days info
   */
  public getStreakDaysInfo(searchCriterias: IActivityCriteria[]): IStreakDaysInfo {
    const activitiesDates = this.getActivitiesByCriteria(searchCriterias)
      .map(activity => activity.startTimeLocal.split(' ')[0]);

    const firstDate = new Date(activitiesDates[activitiesDates.length - 1]);
    const lastDate = new Date(activitiesDates[0]);

    const datesRange = DateUtils.getAllDatesInTheRange(firstDate, lastDate);

    let sets: string[][] = [];
    let currentSet: string[] = [];

    datesRange.map(date => DateUtils.convert(date)).forEach((date, index) => {
        const activityExist = activitiesDates.indexOf(date) > -1;
        const lastItem = index === datesRange.length - 1;

        if (activityExist) {
            currentSet = [...currentSet, date];
        }

        if ((!activityExist || lastItem) && currentSet.length > 0) {
            sets = [...sets, [...currentSet]];
            currentSet = [];
        }
    });

    const maxStreakDays = Math.max(...sets.map(set => set.length));

    const streakDaysInfo: IStreakDaysInfo = {
      current: sets[sets.length - 1].length,
      max: maxStreakDays,
      maxDates: sets.filter(set => set.length === maxStreakDays)
        .map(set => ({ start: new Date(set[0]), end: new Date(set[set.length - 1]) }))
    };

    return streakDaysInfo;
  }

  /**
   * Returns activities that match one of search criterias
   * @param searchCriterias activities search criterias
   * @returns activities that meet any of search criterias
   */
  private getActivitiesByCriteria(searchCriterias: IActivityCriteria[]): IActivity[] {
    const activities = this.activities
      .filter((activity) => {
        const matchCriteria = searchCriterias.find((criteria) => criteria.activityType === activity.activityType.typeId);

        if (!matchCriteria) {
          return false
        }

        return matchCriteria.nameLike ? activity.activityName === matchCriteria.nameLike : true;
      });

    return activities;
  }
}
