import { Component, Input } from '@angular/core';
import { WidgetLength } from 'src/app/enums/widget-length.enum';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent {

  @Input() value: string | number;
  @Input() subValue: string;
  @Input() title: string;
  @Input() percent: number;
  @Input() isTotal: boolean;
  @Input() widgetSize: WidgetLength;

  get circleOffset(): number {
    return 360 - ((this.percent > 100 ? 100 : this.percent) * 2.1);
  }
}
