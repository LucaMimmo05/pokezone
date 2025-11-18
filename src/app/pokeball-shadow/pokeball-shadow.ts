import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pokeball-shadow',
  imports: [],
  templateUrl: './pokeball-shadow.html',
  styleUrl: './pokeball-shadow.css',
})
export class PokeballShadow {
  size = input<number>(512);
}
