import { Component, input } from '@angular/core';

@Component({
  selector: 'app-drop-svg',
  imports: [],
  templateUrl: './drop-svg.html',
  styleUrl: './drop-svg.css',
})
export class DropSVG {
  color = input<string>('#E87878');
}
