import { Component, Input } from '@angular/core';
import { TypeEntry } from '../../../models/pokemon-details/type-entry';

@Component({
  selector: 'app-pokemon-details-type',
  imports: [],
  templateUrl: './pokemon-details-type.html',
  styleUrls: [
    './pokemon-details-type.css',
    '../pokemon-details-common.css'
  ]
})
export class PokemonDetailsType {
  @Input()
  types: TypeEntry[] = [];
}
