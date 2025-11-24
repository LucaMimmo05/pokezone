import { Component, Input } from '@angular/core';
import { AbilityEntry } from '../../../models/pokemon-details/ability-entry';

@Component({
  selector: 'app-pokemon-details-abilities',
  imports: [],
  templateUrl: './pokemon-details-abilities.html',
  styleUrls: [
    './pokemon-details-abilities.css',
    '../pokemon-details-common.css'
  ],
})
export class PokemonDetailsAbilities {
  @Input()
  abilities: AbilityEntry[] = [];
}
