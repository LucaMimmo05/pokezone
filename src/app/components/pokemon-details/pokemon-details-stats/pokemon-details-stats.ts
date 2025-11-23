import { Component, Input } from '@angular/core';
import { StatEntry } from '../../../models/pokemon-details/stat-entry';

@Component({
  selector: 'app-pokemon-details-stats',
  imports: [],
  templateUrl: './pokemon-details-stats.html',
  styleUrls: [
    './pokemon-details-stats.css',
    '../pokemon-details-common.css'
  ]
})
export class PokemonDetailsStats {
  @Input()
  stats: StatEntry[] = [];
}
