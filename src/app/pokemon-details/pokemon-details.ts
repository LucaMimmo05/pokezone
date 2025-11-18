import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokezoneService } from '../services/pokezone-service';
import { Pokemon } from '../models/pokemon-details/pokemon';

@Component({
  selector: 'app-pokemon-details',
  imports: [],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails {
    private readonly route = inject(ActivatedRoute);
    private readonly pokezoneService = inject(PokezoneService);
    pokemon: Pokemon | null = null;
    id: number = 4;
    category: any = null;

    async ngOnInit() {
      this.loadPokemonDetails();
      this.loadPokemonCategory();
    }

    async loadPokemonDetails() {
      this.pokemon = await this.pokezoneService.getPokemonDetails(this.id);
    }

    async loadPokemonCategory() {
      this.category = await this.pokezoneService.getPokemonCategory(this.id);
      const englishName = this.category.genera.find((g: any) => g.language.name === 'en');
      this.category = englishName ? englishName.genus : 'Unknown';
    }
}
