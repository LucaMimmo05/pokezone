import { Component, input } from '@angular/core';

@Component({
  selector: 'app-carousel-dot',
  imports: [],
  templateUrl: './carousel-dot.html',
  styleUrl: './carousel-dot.css',
})
export class CarouselDot {
    isActive = input<boolean>();

}
