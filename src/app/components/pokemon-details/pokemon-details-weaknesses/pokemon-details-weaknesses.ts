import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-details-weaknesses',
  imports: [],
  templateUrl: './pokemon-details-weaknesses.html',
  styleUrls: [
    './pokemon-details-weaknesses.css', 
    '../pokemon-details-common.css'
  ]
})
export class PokemonDetailsWeaknesses {
  @Input()
  weaknesses: string[] = [];
}
