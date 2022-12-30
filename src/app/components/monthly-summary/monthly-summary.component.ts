import { Component, Input } from '@angular/core';
import { CountType } from 'src/app/enums/count-type.enum';
import { IMonthlySummaryConfigs } from 'src/app/interfaces/widget-configs/monthly-summary-configs.interface';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.scss']
})
export class MonthlySummaryComponent {
  readonly months = DateUtils.MonthsFullList;

  /** Yearly summaries */
  @Input() summaries: IYearSummary[];

  /** Monthly summary configs */
  @Input() configs: IMonthlySummaryConfigs;

  readonly countType: typeof CountType = CountType;
}
