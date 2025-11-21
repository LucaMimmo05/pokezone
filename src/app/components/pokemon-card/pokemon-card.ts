import { Component, input } from '@angular/core';
import { PokemonCard as PokemonCardModel } from '../../models/dashboard/pokemon-card';
import { capitalize } from '../../util/capitalize';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input<PokemonCardModel>();
  capitalize = capitalize;

  private typeColorMap: Record<string, string> = {
    dragon: '#2C6AC1',
    electric: '#EED967',
    fairy: '#E296E1',
    fighting: '#C44D61',
    fire: '#F66D6D',
    flying: '#A6BBE8',
    ghost: '#616EB7',
    grass: '#73B861',
    ground: '#CE8056',
    ice: '#74CEC0',
    normal: '#A0A29F',
    poison: '#AC6ACA',
    psychic: '#EB8B85',
    rock: '#8BCEC1',
    steel: '#6594A1',
    water: '#88A3D4',
    bug: '#9BBA48',
    dark: '#5A5465',
  };

  constructor(private sanitizer: DomSanitizer) {}

  getTypeColor(type: string): string {
    return this.typeColorMap[type.toLowerCase()] || '#A0A29F';
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
}
