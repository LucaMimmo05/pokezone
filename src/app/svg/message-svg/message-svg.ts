import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-svg',
  imports: [],
  templateUrl: './message-svg.html',
  styleUrl: './message-svg.css',
})
export class MessageSVG {
  color = input<string>('#E87878');
}
