import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokezoneService } from '../services/pokezone-service';
import { Pokemon } from '../models/pokemon-details/pokemon';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly pokezoneService = inject(PokezoneService);
  pokemon: Pokemon | null = null;
  id: number = 4;
  category: any = null;
  weaknesses: string[] = [];

  async ngOnInit() {
    await this.loadPokemonDetails();
    await this.loadPokemonCategory();
    await this.loadPokemonWeaknesses();
  }

  async loadPokemonDetails() {
    this.pokemon = await this.pokezoneService.getPokemonDetails(this.id);
  }

  async loadPokemonCategory() {
    this.category = await this.pokezoneService.getPokemonCategory(this.id);
  }

  async loadPokemonWeaknesses() {
    this.weaknesses = await this.pokezoneService.getPokemonWeaknessesByType(this.pokemon?.types[0].type.name || '');
  }

  get idWithZeros(): void | string {
    if(this.pokemon?.id){
      return '#' + this.pokemon.id.toString().padStart(3, '0')
    }
    else return;
  }
}