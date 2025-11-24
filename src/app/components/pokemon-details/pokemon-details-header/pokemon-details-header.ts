import { Component, Input } from '@angular/core';
import { TypeEntry } from '../../../models/pokemon-details/type-entry';

@Component({
  selector: 'app-pokemon-details-header',
  imports: [],
  templateUrl: './pokemon-details-header.html',
  styleUrl: './pokemon-details-header.css',
})
export class PokemonDetailsHeader {
  @Input()
  types: TypeEntry[] = [];
}
