import { Component, inject, Input } from '@angular/core';
import { StatEntry } from '../../models/pokemon-details/stat-entry';

@Component({
  selector: 'app-pokemon-details-stats',
  imports: [],
  templateUrl: './pokemon-details-stats.html',
  styleUrl: './pokemon-details-stats.css',
})
export class PokemonDetailsStats {
  @Input()
  stats: StatEntry[] = [];
  
  async ngOnInit() {

  }
}
