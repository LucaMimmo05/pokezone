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

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    
    // Prova diversi fallback in sequenza
    if (this.sprites.front_default && img.src !== this.sprites.front_default) {
      img.src = this.sprites.front_default;
    } else if (!img.dataset['fallbackAttempted']) {
      // Prova con versione base del Pokémon
      const baseName = this.name.split('-')[0];
      img.dataset['fallbackAttempted'] = 'true';
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${baseName}.png`;
    } else {
      // Ultima risorsa: immagine placeholder
      img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
    }
  }
}
