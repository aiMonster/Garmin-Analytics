import { IActivity } from './activity.interface';

export interface IImportedActivity extends IActivity {
  duplicate: boolean;
  utcDate: Date;
}
