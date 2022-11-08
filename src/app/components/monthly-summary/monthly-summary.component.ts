import { Component, Input } from '@angular/core';
import { IYearSummary } from 'src/app/interfaces/year-summary.interface';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.scss']
})
export class MonthlySummaryComponent {
  readonly months = DateUtils.MonthsFullList;

  @Input() summaries: IYearSummary[];
}
