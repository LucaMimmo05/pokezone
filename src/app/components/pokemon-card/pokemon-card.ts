import { Component, input } from '@angular/core';
import { PokemonCard as PokemonCardModel } from '../../models/dashboard/pokemon-card';
import { capitalize } from '../../util/capitalize';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input<PokemonCardModel>();
  capitalize = capitalize;
}
