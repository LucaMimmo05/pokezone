import { Component, Input } from '@angular/core';
import { NamedAPIResource } from '../../../models/pokemon-details/named-api-resource';
import { EvolutionStage } from '../../../models/pokemon-details/evolution-stage';
import { EvolutionChain } from '../../../models/pokemon-details/evolution-chain';
import { getDataFromUrl } from '../../../utils/url-utils';
import { ArrowSvg } from '../../../svg/arrow-svg/arrow-svg';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details-evolution-chain',
  imports: [ArrowSvg],
  templateUrl: './pokemon-details-evolution-chain.html',
  styleUrls: [
    './pokemon-details-evolution-chain.css',
    '../pokemon-details-common.css'
  ]
})
export class PokemonDetailsEvolutionChain {

  @Input()
  species!: NamedAPIResource;

  evolutionPaths: EvolutionStage[][] = [];

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    if (!this.species?.url) return;
    this.evolutionPaths = await this.pokemonService.getEvolutionChain(this.species.url);
  }

  getDataFromUtils(url: string): string {
    return getDataFromUrl(url);
  }
}
