import { Component, Input } from '@angular/core';
import { SpriteSet } from '../../../models/pokemon-details/sprite-set';

@Component({
  selector: 'app-pokemon-details-image',
  imports: [],
  templateUrl: './pokemon-details-image.html',
  styleUrl: './pokemon-details-image.css',
})
export class PokemonDetailsImage {
  @Input()
  sprites: SpriteSet = {} as SpriteSet;

  @Input()
  name: string = "";
}
