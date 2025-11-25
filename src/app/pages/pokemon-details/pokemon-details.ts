import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { FooterVisibilityService } from '../../services/footer-visibility.service';
import { Pokemon } from '../../models/pokemon-details/pokemon';
import { PokemonDetailsImage } from '../../components/pokemon-details/pokemon-details-image/pokemon-details-image';
import { PokemonDetailsHeader } from '../../components/pokemon-details/pokemon-details-header/pokemon-details-header';
import { PokemonDetailsTitle } from '../../components/pokemon-details/pokemon-details-title/pokemon-details-title';
import { PokemonDetailsType } from '../../components/pokemon-details/pokemon-details-type/pokemon-details-type';
import { PokemonDetailsPhysicalInfo } from '../../components/pokemon-details/pokemon-details-physical-info/pokemon-details-physical-info';
import { PokemonDetailsAbilities } from '../../components/pokemon-details/pokemon-details-abilities/pokemon-details-abilities';
import { PokemonDetailsWeaknesses } from '../../components/pokemon-details/pokemon-details-weaknesses/pokemon-details-weaknesses';
import { PokemonDetailsStats } from '../../components/pokemon-details/pokemon-details-stats/pokemon-details-stats';
import { PokemonDetailsEvolutionChain } from '../../components/pokemon-details/pokemon-details-evolution-chain/pokemon-details-evolution-chain';
import { LoaderComponent } from '../../components/loader/loader';
import { PokemonDetailsMoves } from "../../components/pokemon-details/pokemon-details-moves/pokemon-details-moves";

@Component({
  selector: 'app-pokemon-details',
  imports: [
    LoaderComponent,
    PokemonDetailsHeader,
    PokemonDetailsImage,
    PokemonDetailsTitle,
    PokemonDetailsType,
    PokemonDetailsPhysicalInfo,
    PokemonDetailsAbilities,
    PokemonDetailsWeaknesses,
    PokemonDetailsStats,
    PokemonDetailsEvolutionChain,
    PokemonDetailsMoves
],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css',
})
export class PokemonDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pokezoneService = inject(PokemonService);
  private readonly footerService = inject(FooterVisibilityService);
  pokemon: Pokemon | null = null;
  id!: number;
  category: any = null;
  weaknesses: string[] = [];

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.id = Number(params.get('id'));

      if (!this.id) return;

      await this.loadPokemonDetails();
      await this.loadPokemonCategory();
      await this.loadPokemonWeaknesses();
    });
      this.footerService.hideFooter();

  }

  ngOnDestroy() {
    this.footerService.showFooterAgain();
  }

  async loadPokemonDetails() {
    try {
      this.pokemon = await this.pokezoneService.getPokemonDetailsById(this.id);
      if (!this.pokemon) {
        this.router.navigate(['/not-found']);
      }
    } catch (error) {
      this.router.navigate(['/not-found']);
    }
  }

  async loadPokemonCategory() {
    this.category = await this.pokezoneService.getPokemonCategory(this.id);
  }

  async loadPokemonWeaknesses() {
    this.weaknesses = await this.pokezoneService.getPokemonWeaknessesByType(
      this.pokemon?.types[0].type.name || ''
    );
  }
}
