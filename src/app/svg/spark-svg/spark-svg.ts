import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spark-svg',
  imports: [],
  templateUrl: './spark-svg.html',
  styleUrl: './spark-svg.css',
})
export class SparkSVG {
  color = input<string>('#E87878');
}
