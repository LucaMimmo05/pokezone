import { Component, OnInit, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { NamedAPIResource } from '../../models/pokemon-details/named-api-resource';

@Component({
  selector: 'app-ability-filter',
  imports: [CommonModule],
  templateUrl: './ability-filter.html',
  styleUrl: './ability-filter.css',
})
export class AbilityFilter implements OnInit {
  abilitySelected = output<string>();
  pokemonService = inject(PokemonService);
  abilities: NamedAPIResource[] = [];
  isOpen = false;
  selectedAbility = 'All abilities';

  async ngOnInit() {
    this.abilities = await this.pokemonService.getAllAbilities();
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  selectAbility(ability: string) {
    this.selectedAbility = ability || 'All abilities';
    this.abilitySelected.emit(ability);
    this.isOpen = false;
  }
}
