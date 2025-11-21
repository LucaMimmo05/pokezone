import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon-details/pokemon';

@Component({
  selector: 'app-pokemon-details',
  imports: [],
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
}
