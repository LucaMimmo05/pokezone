import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PokemonDetails } from '../models/dashboard/pokemon-details';
import { PokemonSpecies } from '../models/dashboard/pokemon-species';
import { DashboardStats } from '../models/dashboard/dashboard-stats';
import { Pokemon as PokemonDetail } from '../models/pokemon-details/pokemon';
import { NamedAPIResource } from '../models/pokemon-details/named-api-resource';

export type { DashboardStats } from '../models/dashboard/dashboard-stats';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  async getAllPokemon(limit?: number): Promise<NamedAPIResource[]> {
    const url = limit
      ? `${this.baseUrl}/pokemon?limit=${limit}`
      : `${this.baseUrl}/pokemon?limit=100000`;
    const response = await firstValueFrom(
      this.http
        .get<{ results: NamedAPIResource[] }>(url)
        .pipe(map((response: any) => response.results))
    );
    return response;
  }

  async getAllAbilities(): Promise<NamedAPIResource[]> {
    const url = `${this.baseUrl}/ability?limit=1000`;
    const response = await firstValueFrom(
      this.http
        .get<{ results: NamedAPIResource[] }>(url)
        .pipe(map((response: any) => response.results))
    );
    return response.sort((a: NamedAPIResource, b: NamedAPIResource) =>
      a.name.localeCompare(b.name)
    );
  }

  async getPokemonDetails(url: string): Promise<PokemonDetails> {
    return firstValueFrom(this.http.get<PokemonDetails>(url));
  }

  async getPokemonSpecies(url: string): Promise<PokemonSpecies> {
    return firstValueFrom(this.http.get<PokemonSpecies>(url));
  }

  async getDashboardStats(limit?: number): Promise<DashboardStats> {
    const pokemons = await this.getAllPokemon(limit);
    const details = await Promise.all(
      pokemons.map((p: NamedAPIResource) => this.getPokemonDetails(p.url))
    );
    const species = await Promise.all(
      details.map((d: PokemonDetails) => this.getPokemonSpecies(d.species.url))
    );

    const stats: DashboardStats = {
      totalPokemon: details.length,
      totalTypes: 0,
      pokemonByType: {},
      pokemonByColor: {},
      pokemonByShape: {},
    };

    details.forEach((pokemon: PokemonDetails) => {
      pokemon.types.forEach((t: any) => {
        const typeName = t.type.name;
        stats.pokemonByType[typeName] = (stats.pokemonByType[typeName] || 0) + 1;
      });
    });

    species.forEach((s: PokemonSpecies) => {
      const colorName = s.color.name;
      stats.pokemonByColor[colorName] = (stats.pokemonByColor[colorName] || 0) + 1;
    });

    species.forEach((s: PokemonSpecies) => {
      if (s.shape) {
        const shapeName = s.shape.name;
        stats.pokemonByShape[shapeName] = (stats.pokemonByShape[shapeName] || 0) + 1;
      }
    });

    stats.totalTypes = Object.keys(stats.pokemonByType).length;

    return stats;
  }

  async getPokemonDetailsById(id: number): Promise<PokemonDetail> {
    const response = this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${id}`);
    return firstValueFrom(response);
  }

  async getPokemonCategory(id: number): Promise<any> {
    const response = this.http.get<any>(`${this.baseUrl}/pokemon-species/${id}`);
    const data = await firstValueFrom(response);
    const englishName = data.genera.find((g: any) => g.language.name === 'en');
    return englishName ? englishName.genus : 'Unknown';
  }

  async getPokemonWeaknessesByType(type: string): Promise<string[]> {
    const response = this.http.get<any>(`${this.baseUrl}/type/${type}`);
    const data = await firstValueFrom(response);
    return data.damage_relations.double_damage_from.map((t: any) => t.name);
  }

  private async getPokemonReferences(
    type: string,
    ability: string
  ): Promise<NamedAPIResource[]> {
    if (type && ability) {
      const [typeResponse, abilityResponse] = await Promise.all([
        firstValueFrom(
          this.http.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(
            `${this.baseUrl}/type/${type}`
          )
        ),
        firstValueFrom(
          this.http.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(
            `${this.baseUrl}/ability/${ability}`
          )
        ),
      ]);

      const typePokemons = typeResponse.pokemon.map((p) => p.pokemon);
      const abilityPokemons = abilityResponse.pokemon.map((p) => p.pokemon);

      return typePokemons.filter((tp) =>
        abilityPokemons.some((ap) => ap.name === tp.name)
      );
    } else if (type) {
      const typeResponse = await firstValueFrom(
        this.http.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(
          `${this.baseUrl}/type/${type}`
        )
      );
      return typeResponse.pokemon.map((p) => p.pokemon);
    } else if (ability) {
      const abilityResponse = await firstValueFrom(
        this.http.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(
          `${this.baseUrl}/ability/${ability}`
        )
      );
      return abilityResponse.pokemon.map((p) => p.pokemon);
    } else {
      return this.getAllPokemon(10000);
    }
  }

  async getPokemonCards(
    limit: number = 20,
    offset: number = 0,
    type: string = '',
    ability: string = ''
  ): Promise<{ id: number; name: string; imageUrl: string; types: string[] }[]> {
    let response: NamedAPIResource[] = [];

    if (type || ability) {
      const allRefs = await this.getPokemonReferences(type, ability);
      response = allRefs.slice(offset, offset + limit);
    } else {
      const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
      response = await firstValueFrom(
        this.http
          .get<{ results: NamedAPIResource[] }>(url)
          .pipe(map((response: any) => response.results))
      );
    }

    const detailsPromises = response.map((pokemon: NamedAPIResource) =>
      firstValueFrom(this.http.get<PokemonDetail>(pokemon.url))
    );
    const details = await Promise.all(detailsPromises);

    return details.map((pokemon: PokemonDetail) => ({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.sprites.other['official-artwork'].front_default || '',
      types: pokemon.types.map((t: any) => t.type.name),
    }));
  }

  async searchPokemon(
    term: string,
    type: string = '',
    ability: string = ''
  ): Promise<{ id: number; name: string; imageUrl: string; types: string[] }[]> {
    term = term.toLowerCase().trim();
    if (!term) return [];

    try {
      const termAsNumber = Number(term);
      if (!isNaN(termAsNumber) && termAsNumber > 0) {
        try {
          const url = `${this.baseUrl}/pokemon/${termAsNumber}`;
          const pokemon: PokemonDetail = await firstValueFrom(
            this.http.get<PokemonDetail>(url)
          );

          if (type && !pokemon.types.some((t: any) => t.type.name === type)) {
            return [];
          }
          if (
            ability &&
            !pokemon.abilities.some((a: any) => a.ability.name === ability)
          ) {
            return [];
          }

          return [
            {
              id: pokemon.id,
              name: pokemon.name,
              imageUrl:
                pokemon.sprites?.other?.['official-artwork']?.front_default ||
                pokemon.sprites?.front_default ||
                'assets/pokemon-placeholder.png',
              types: pokemon.types.map((t: any) => t.type.name),
            },
          ];
        } catch (idError) {
          console.log(`No Pokémon found with ID: ${term}`);
        }
      }

      const allRefs = await this.getPokemonReferences(type, ability);

      const filteredPokemons = allRefs
        .filter((pokemon: any) => pokemon.name.toLowerCase().includes(term))
        .slice(0, 9);

      if (filteredPokemons.length === 0) {
        const exactMatchPokemons = allRefs
          .filter((pokemon: any) => pokemon.name.toLowerCase().startsWith(term))
          .slice(0, 9);

        if (exactMatchPokemons.length > 0) {
          filteredPokemons.push(...exactMatchPokemons);
        }
      }

      const searchResults: {
        id: number;
        name: string;
        imageUrl: string;
        types: string[];
      }[] = [];
      for (const pokemon of filteredPokemons) {
        try {
          const details: PokemonDetail = await firstValueFrom(
            this.http.get<PokemonDetail>(pokemon.url)
          );
          searchResults.push({
            id: details.id,
            name: details.name,
            imageUrl:
              details.sprites?.other?.['official-artwork']?.front_default ||
              details.sprites?.front_default ||
              'assets/pokemon-placeholder.png',
            types: details.types.map((t: any) => t.type.name),
          });
        } catch (error) {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
        }
      }

      return searchResults;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
}
