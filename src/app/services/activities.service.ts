import { Injectable } from '@angular/core';
import { IActivityCriteria } from '../interfaces/activity-criteria.interface';
import { IActivity } from '../interfaces/activity.interface';
import { IDaySummary } from '../interfaces/day-summary.interface';
import { IMonthSummary } from '../interfaces/month-summary.interface';
import { IStreakDaysInfo } from '../interfaces/streak-days-info.interface';
import { IWeekSummary } from '../interfaces/week-summary.interface';
import { IYearSummary } from '../interfaces/year-summary.interface';
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
   * Get year summary for specified type of activities
   * @param searchCriterias creatria for activities to process
   * @param uniqueDays either unique days should be calculated or activities times
   * @returns monthly summary grouped into years
   */
  public getYearSummaryInfo(searchCriterias: IActivityCriteria[], uniqueDays: boolean): IYearSummary[] {
    let activities = this.getActivitiesByCriteria(searchCriterias);

    if (uniqueDays) {
      activities = activities.filter((activity, index, self) => {
        return self.findIndex(value => DateUtils.getDate(value.startTimeLocal) === DateUtils.getDate(activity.startTimeLocal)) === index;
      });
    }

    const firstDate = new Date(activities[activities.length - 1].startTimeLocal);
    const lastDate = new Date(activities[0].startTimeLocal);

    let yearsSummary = this.getYearsTemplate(firstDate.getFullYear(), lastDate.getFullYear()).reverse();

    activities.forEach(activity => {
      const date = DateUtils.getDate(activity.startTimeLocal);
      const activityYear = +date.split('-')[0];
      const activityMonth = +date.split('-')[1] - 1;

      const yearSummary = yearsSummary.find(yearSummary => yearSummary.year === activityYear);
      yearSummary!.total += 1;
      yearSummary!.months.find(month => month.index === activityMonth)!.value += 1;
    });

    yearsSummary = yearsSummary.map((summary) => ({
      ...summary,
      weeks: this.getWeeksSummary(summary.year, activities)
    }))

    return yearsSummary;
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

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const lastSet = sets[sets.length - 1];
    const wasYesterdayActive = lastSet.includes(DateUtils.convert(yesterday));

    const streakDaysInfo: IStreakDaysInfo = {
      current: wasYesterdayActive ? lastSet.length : 0,
      max: maxStreakDays,
      maxDates: sets.filter(set => set.length === maxStreakDays)
        .map(set => ({ start: new Date(set[0]), end: new Date(set[set.length - 1]) }))
    };

    return streakDaysInfo;
  }

  /**
   * Groups all year activities by week
   * @param year year to group by weeks
   * @param activities activities data group
   * @returns activitis for provided year groupped by week
   */
  private getWeeksSummary(year: number, activities: IActivity[]): IWeekSummary[] {
    const activitesDates = activities.map(activity => DateUtils.getDate(activity.startTimeLocal));
    
    const yearDates = DateUtils.getAllDatesInTheRange(new Date(year, 0, 1), new Date(year, 11, 31));
    
    var yearSummary: IWeekSummary[] = [];
    var weekSummary: IDaySummary[] = [];

    yearDates.forEach((date: Date, index: number) => {
      // If new week started
      if (date.getDay() === 1 && weekSummary.length > 0) {
        yearSummary = [...yearSummary, { days: [...weekSummary] }];
        weekSummary = [];
      }

      const activitiesCount = activitesDates.filter(activityDate => activityDate === DateUtils.convert(date)).length;
      weekSummary = [...weekSummary, { activitiesCount, dateTooltip: DateUtils.formatDate(date) }];

      // If the last item has been added
      if (index === yearDates.length - 1) {
        yearSummary = [...yearSummary,{ days: [...weekSummary] }];
      }
    });

    return yearSummary;
  }

  /**
   * Generates full years template to cover range from start to end year
   * @param startYear start year
   * @param endYear end yeaar
   * @returns years summary templates
   */
  private getYearsTemplate(startYear: number, endYear: number): IYearSummary[] {
    const summaries: IYearSummary[] = [];
    let currentYear = startYear;

    do {
      const monthsTemplate = this.getMonthTemplate(currentYear);

      const yearSummary: IYearSummary = {
        total: 0,
        year: currentYear,
        months: monthsTemplate,
        weeks: [],
        daysInYear: monthsTemplate.reduce((sum, month) => (sum += month.daysInMonth), 0)
      }

      summaries.push(yearSummary);
    } while(currentYear++ < endYear);

    return summaries;
  }

  /**
   * Generates empty months summary for specified year
   * @param year year to provide months for
   * @returns months array of provided year
   */
  private getMonthTemplate(year: number): IMonthSummary[] {
    return Array.from({length: 12}, (x, i) => ({
      index: i,
      value: 0,
      daysInMonth: new Date(year, i + 1, 0).getDate()
    }));
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
