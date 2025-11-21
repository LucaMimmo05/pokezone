import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fire-svg',
  imports: [],
  templateUrl: './fire-svg.html',
  styleUrl: './fire-svg.css',
})
export class FireSVG {
  color = input<string>('#E87878');
}
