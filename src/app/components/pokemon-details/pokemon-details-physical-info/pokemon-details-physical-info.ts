import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-details-physical-info',
  imports: [],
  templateUrl: './pokemon-details-physical-info.html',
  styleUrls: [
    './pokemon-details-physical-info.css',
    '../pokemon-details-common.css'
  ]
})
export class PokemonDetailsPhysicalInfo {
  @Input()
  category: any = null;

  @Input()
  height!: number;

  @Input()
  weight!: number;
}
