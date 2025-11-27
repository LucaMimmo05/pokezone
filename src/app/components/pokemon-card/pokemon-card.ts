import { Component, input } from '@angular/core';
import { PokemonCard as PokemonCardModel } from '../../models/dashboard/pokemon-card';
import { capitalize } from '../../utils/capitalize';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getTypeClass, getTypeColor } from '../../utils/pokemon-types';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input<PokemonCardModel>();
  capitalize = capitalize;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  handleClick(): void {
    const pokemon = this.pokemon();
    if (pokemon) {
      this.router.navigate(['/pokemon', pokemon.id]);
    }
  }

  getTypeClass = getTypeClass;
  getTypeColor = getTypeColor;

  onImageError(event: Event, pokemon: PokemonCardModel): void {
    const img = event.target as HTMLImageElement;
    // Fallback semplice con sprite normale
    if (!img.src.includes('/pokemon/')) {
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    }
  }
}
