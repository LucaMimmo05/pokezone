import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon-details/pokemon';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css',
})

export class PokemonDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);
  pokemon: Pokemon | null = null;
  id: number = 4;
  category: any = null;
  weaknesses: string[] = [];
  MAX_STAT_VALUE = 200;

  async ngOnInit() {
    await this.loadPokemonDetails();
    await this.loadPokemonCategory();
    await this.loadPokemonWeaknesses();
  }

  async loadPokemonDetails() {
    this.pokemon = await this.pokemonService.getPokemonDetailsById(this.id);
  }

  async loadPokemonCategory() {
    this.category = await this.pokemonService.getPokemonCategory(this.id);
  }

  async loadPokemonWeaknesses() {
    this.weaknesses = await this.pokemonService.getPokemonWeaknessesByType(
      this.pokemon?.types[0].type.name || ''
    );
  }

  get idWithZeros(): void | string {
    if(this.pokemon?.id){
      return '#' + this.pokemon.id.toString().padStart(3, '0')
    }
    else return;
  }
  
  getStatPercentage(baseStat: number): number {
    let percentage = (baseStat / this.MAX_STAT_VALUE) * 100;
    return Math.min(percentage, 100); 
  }
}
