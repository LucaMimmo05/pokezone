import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon-details/pokemon';
import { PokemonDetailsImage } from "../../components/pokemon-details/pokemon-details-image/pokemon-details-image";
import { PokemonDetailsHeader } from "../../components/pokemon-details/pokemon-details-header/pokemon-details-header";
import { PokemonDetailsTitle } from "../../components/pokemon-details/pokemon-details-title/pokemon-details-title";
import { PokemonDetailsType } from "../../components/pokemon-details/pokemon-details-type/pokemon-details-type";
import { PokemonDetailsPhysicalInfo } from "../../components/pokemon-details/pokemon-details-physical-info/pokemon-details-physical-info";
import { PokemonDetailsAbilities } from "../../components/pokemon-details/pokemon-details-abilities/pokemon-details-abilities";
import { PokemonDetailsWeaknesses } from "../../components/pokemon-details/pokemon-details-weaknesses/pokemon-details-weaknesses";
import { PokemonDetailsStats } from "../../components/pokemon-details/pokemon-details-stats/pokemon-details-stats";
import { PokemonDetailsEvolutionChain } from "../../components/pokemon-details/pokemon-details-evolution-chain/pokemon-details-evolution-chain";

@Component({
  selector: 'app-pokemon-details',
  imports: [
    PokemonDetailsHeader,
    PokemonDetailsImage,
    PokemonDetailsTitle,
    PokemonDetailsType,
    PokemonDetailsPhysicalInfo,
    PokemonDetailsAbilities,
    PokemonDetailsWeaknesses,
    PokemonDetailsStats,
    PokemonDetailsEvolutionChain
  ],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly pokezoneService = inject(PokemonService);
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
    this.pokemon = await this.pokezoneService.getPokemonDetailsById(this.id);
  }

  async loadPokemonCategory() {
    this.category = await this.pokezoneService.getPokemonCategory(this.id);
  }

  async loadPokemonWeaknesses() {
    this.weaknesses = await this.pokezoneService.getPokemonWeaknessesByType(this.pokemon?.types[0].type.name || '');
  }
}