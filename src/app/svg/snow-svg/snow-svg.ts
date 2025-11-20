import { Component, input } from '@angular/core';

@Component({
  selector: 'app-snow-svg',
  imports: [],
  templateUrl: './snow-svg.html',
  styleUrl: './snow-svg.css',
})
export class SnowSVG {
  color = input<string>('#E87878');
}
