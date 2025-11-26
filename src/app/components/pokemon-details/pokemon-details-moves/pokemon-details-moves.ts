import { Component, Input } from '@angular/core';
import { MoveEntry } from '../../../models/pokemon-details/move-entry';

@Component({
  selector: 'app-pokemon-details-moves',
  imports: [],
  templateUrl: './pokemon-details-moves.html',
  styleUrls: [
    './pokemon-details-moves.css',
    '../pokemon-details-common.css'
  ]
})
export class PokemonDetailsMoves {
  @Input()
  moves: MoveEntry[] = [];
}
