import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lightning-svg',
  imports: [],
  templateUrl: './lightning-svg.html',
  styleUrl: './lightning-svg.css',
})
export class LightningSVG {
  color = input<string>('#E87878');
}
