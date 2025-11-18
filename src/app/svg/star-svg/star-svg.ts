import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-svg',
  imports: [],
  templateUrl: './star-svg.html',
  styleUrl: './star-svg.css',
})
export class StarSVG {
  size = input<number>(24);
}
