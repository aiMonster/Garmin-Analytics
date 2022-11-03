import { Component, Input } from '@angular/core';

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

  get circleOffset(): number {
    return 360 - (this.percent * 2.1);
  }
}
