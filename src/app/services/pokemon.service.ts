import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PokemonDetails } from '../models/dashboard/pokemon-details';
import { PokemonSpecies } from '../models/dashboard/pokemon-species';
import { DashboardStats } from '../models/dashboard/dashboard-stats';
import { Pokemon as PokemonDetail } from '../models/pokemon-details/pokemon';
import { NamedAPIResource } from '../models/pokemon-details/named-api-resource';
import { EvolutionStage } from '../models/pokemon-details/evolution-stage';
import { EvolutionChain } from '../models/pokemon-details/evolution-chain';

export type { DashboardStats } from '../models/dashboard/dashboard-stats';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  private dashboardStatsCache: DashboardStats | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

 
  private isValidPokemon(url: string): boolean {
    const match = url.match(/\/pokemon\/(\d+)\/?$/);
    if (!match) return true;
    const id = parseInt(match[1], 10);
    return id <= 1025;
  }

  async getAllPokemon(limit?: number): Promise<NamedAPIResource[]> {
    const url = limit
      ? `${this.baseUrl}/pokemon?limit=${limit}`
      : `${this.baseUrl}/pokemon?limit=100000`;
    const response = await firstValueFrom(
      this.http
        .get<{ results: NamedAPIResource[] }>(url)
        .pipe(map((response: any) => response.results))
    );
    return response.filter((p: NamedAPIResource) => this.isValidPokemon(p.url));
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
    const now = Date.now();
    if (this.dashboardStatsCache && now - this.cacheTimestamp < this.CACHE_DURATION) {
      return this.dashboardStatsCache;
    }

    const url = limit
      ? `${this.baseUrl}/pokemon?limit=${limit}`
      : `${this.baseUrl}/pokemon?limit=100000`;
    const pokemons = await firstValueFrom(
      this.http
        .get<{ results: NamedAPIResource[] }>(url)
        .pipe(map((response: any) => response.results))
    );

    const CHUNK_SIZE = 100;
    const allDetails: PokemonDetails[] = [];
    const allSpecies: PokemonSpecies[] = [];

    for (let i = 0; i < pokemons.length; i += CHUNK_SIZE) {
      const chunk = pokemons.slice(i, i + CHUNK_SIZE);

      const chunkDetails = await Promise.all(
        chunk.map((p: NamedAPIResource) => this.getPokemonDetails(p.url))
      );
      allDetails.push(...chunkDetails);

      const chunkSpecies = await Promise.all(
        chunkDetails.map((d: PokemonDetails) => this.getPokemonSpecies(d.species.url))
      );
      allSpecies.push(...chunkSpecies);
    }

    const stats: DashboardStats = {
      totalPokemon: allDetails.length,
      totalTypes: 0,
      pokemonByType: {},
      pokemonByColor: {},
      pokemonByShape: {},
    };

    allDetails.forEach((pokemon: PokemonDetails) => {
      pokemon.types.forEach((t: any) => {
        const typeName = t.type.name;
        stats.pokemonByType[typeName] = (stats.pokemonByType[typeName] || 0) + 1;
      });
    });

    allSpecies.forEach((s: PokemonSpecies) => {
      const colorName = s.color.name;
      stats.pokemonByColor[colorName] = (stats.pokemonByColor[colorName] || 0) + 1;
    });

    allSpecies.forEach((s: PokemonSpecies) => {
      if (s.shape) {
        const shapeName = s.shape.name;
        stats.pokemonByShape[shapeName] = (stats.pokemonByShape[shapeName] || 0) + 1;
      }
    });

    stats.totalTypes = Object.keys(stats.pokemonByType).length;

    this.dashboardStatsCache = stats;
    this.cacheTimestamp = Date.now();

    return stats;
  }

  clearDashboardCache(): void {
    this.dashboardStatsCache = null;
    this.cacheTimestamp = 0;
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

  private async getPokemonReferences(type: string, ability: string): Promise<NamedAPIResource[]> {
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

      const typePokemons = typeResponse.pokemon
        .map((p) => p.pokemon)
        .filter((p) => this.isValidPokemon(p.url));
      const abilityPokemons = abilityResponse.pokemon
        .map((p) => p.pokemon)
        .filter((p) => this.isValidPokemon(p.url));

      return typePokemons.filter((tp) => abilityPokemons.some((ap) => ap.name === tp.name));
    } else if (type) {
      const typeResponse = await firstValueFrom(
        this.http.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(`${this.baseUrl}/type/${type}`)
      );
      return typeResponse.pokemon.map((p) => p.pokemon).filter((p) => this.isValidPokemon(p.url));
    } else if (ability) {
      const abilityResponse = await firstValueFrom(
        this.http.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(
          `${this.baseUrl}/ability/${ability}`
        )
      );
      return abilityResponse.pokemon
        .map((p) => p.pokemon)
        .filter((p) => this.isValidPokemon(p.url));
    } else {
      return this.getAllPokemon(10000);
    }
  }

  async getPokemonCount(type: string = '', ability: string = ''): Promise<number> {
    if (type || ability) {
      const allRefs = await this.getPokemonReferences(type, ability);
      return allRefs.length;
    } else {
      const url = `${this.baseUrl}/pokemon?limit=1`;
      const response = await firstValueFrom(this.http.get<{ count: number }>(url));
      return response.count;
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
      const allResponse = await firstValueFrom(
        this.http
          .get<{ results: NamedAPIResource[] }>(url)
          .pipe(map((response: any) => response.results))
      );
      response = allResponse.filter((p: NamedAPIResource) => this.isValidPokemon(p.url));
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
          const pokemon: PokemonDetail = await firstValueFrom(this.http.get<PokemonDetail>(url));

          if (type && !pokemon.types.some((t: any) => t.type.name === type)) {
            return [];
          }
          if (ability && !pokemon.abilities.some((a: any) => a.ability.name === ability)) {
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
        .filter(
          (pokemon: any) =>
            this.isValidPokemon(pokemon.url) && pokemon.name.toLowerCase().includes(term)
        )
        .slice(0, 9);

      if (filteredPokemons.length === 0) {
        const exactMatchPokemons = allRefs
          .filter(
            (pokemon: any) =>
              this.isValidPokemon(pokemon.url) && pokemon.name.toLowerCase().startsWith(term)
          )
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

  async getEvolutionChain(speciesUrl: string): Promise<EvolutionStage[][]> {
    const speciesData = await firstValueFrom(this.http.get<any>(speciesUrl));

    const evolutionChain = await firstValueFrom(
      this.http.get<EvolutionChain>(speciesData.evolution_chain.url)
    );

    const evolutionPaths: EvolutionStage[][] = [];

    const createPaths = (stage: EvolutionStage, currentPath: EvolutionStage[]) => {
      const newPath = [...currentPath, stage];

      if (!stage.evolves_to || stage.evolves_to.length === 0) {
        evolutionPaths.push(newPath);
        return;
      }

      for (const nextStage of stage.evolves_to) {
        createPaths(nextStage, newPath);
      }
    };

    createPaths(evolutionChain.chain, []);

    return evolutionPaths;
  }
}
