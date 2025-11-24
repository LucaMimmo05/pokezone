import { Component, Input } from '@angular/core';
import { NamedAPIResource } from '../../../models/pokemon-details/named-api-resource';
import { EvolutionStage } from '../../../models/pokemon-details/evolution-stage';
import { EvolutionChain } from '../../../models/pokemon-details/evolution-chain';
import { getDataFromUrl } from '../../../utils/url-utils';
import { ArrowSvg } from '../../../svg/arrow-svg/arrow-svg';

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

  async ngOnInit() {
    if (!this.species?.url) return;
    await this.loadEvolutionChain();
  }

  //TODO: spostare in service
  async loadEvolutionChain() {
    const speciesResponse = await fetch(this.species.url);
    const speciesData = await speciesResponse.json();

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionChain: EvolutionChain = await evolutionResponse.json();

    this.evolutionPaths = [];
    this.createPaths(evolutionChain.chain, []);
  }

  //TODO: spostare in service
  createPaths(stage: EvolutionStage, currentPath: EvolutionStage[]) {
    const newPath = [...currentPath];
    newPath.push(stage);

    if (stage.evolves_to.length === 0) {
      this.evolutionPaths.push(newPath);
      return;
    }

    for (let nextStage of stage.evolves_to) {
      this.createPaths(nextStage, newPath);
    }
  }

  getDataFromUtils(url: string): string {
    return getDataFromUrl(url);
  }
}
