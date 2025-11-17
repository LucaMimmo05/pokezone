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

    async ngOnInit() {
      this.loadPokemonDetails();
    }

    async loadPokemonDetails() {
      this.pokemon = await this.pokezoneService.getPokemonDetails(this.id);
    }
}
