import { Component, input } from '@angular/core';

@Component({
  selector: 'app-leaf-svg',
  imports: [],
  templateUrl: './leaf-svg.html',
  styleUrl: './leaf-svg.css',
})
export class LeafSVG {
  color = input<string>('#E87878');
}
