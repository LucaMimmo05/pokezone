import { Component, Input } from '@angular/core';
import { NamedAPIResource } from '../../../models/pokemon-details/named-api-resource';
import { EvolutionStage } from '../../../models/pokemon-details/evolution-stage';
import { getDataFromUrl } from '../../../utils/url-utils';
import { ArrowSvg } from '../../../svg/arrow-svg/arrow-svg';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

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

  visiblePaths = 1;
  isLoading = false;
  isSearching = false;

  constructor (
    private pokemonService: PokemonService, 
    private router: Router
  ) {}

  async ngOnInit() {
    if (!this.species?.url) return;
    this.evolutionPaths = await this.pokemonService.getEvolutionChain(this.species.url);
  }

  getDataFromUtils(url: string): string {
    return getDataFromUrl(url);
  }

  goToPokemon(stage: EvolutionStage) {
    const id = getDataFromUrl(stage.species.url);
    this.router.navigate(['/pokemon', id]);
  }

  handleClick(stage: EvolutionStage): void {
    const id = this.getDataFromUtils(stage.species.url);
    if (id) {
      this.router.navigate(['/pokemon', id]);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  async loadMore() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.visiblePaths = this.evolutionPaths.length;

    this.isLoading = false;
  }

  get displayedPaths(): EvolutionStage[][] {
    return this.evolutionPaths.slice(0, this.visiblePaths);
  }
}
