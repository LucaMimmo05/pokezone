import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/dashboard/pokemon';
import { PokemonDetails } from '../models/dashboard/pokemon-details';
import { PokemonSpecies } from '../models/dashboard/pokemon-species';
import { DashboardStats } from '../models/dashboard/dashboard-stats';
import { Pokemon as PokemonDetail } from '../models/pokemon-details/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  // Metodi originali di pokemon.service.ts
  async getAllPokemon(limit?: number): Promise<Pokemon[]> {
    const url = limit
      ? `${this.baseUrl}/pokemon?limit=${limit}`
      : `${this.baseUrl}/pokemon?limit=100000`;
    const response = await firstValueFrom(
      this.http.get<{ results: Pokemon[] }>(url).pipe(map((response: any) => response.results))
    );
    return response;
  }

  async getPokemonDetails(url: string): Promise<PokemonDetails> {
    return firstValueFrom(this.http.get<PokemonDetails>(url));
  }

  async getPokemonSpecies(url: string): Promise<PokemonSpecies> {
    return firstValueFrom(this.http.get<PokemonSpecies>(url));
  }

  async getDashboardStats(limit?: number): Promise<DashboardStats> {
    const pokemons = await this.getAllPokemon(limit);
    const details = await Promise.all(pokemons.map((p: Pokemon) => this.getPokemonDetails(p.url)));
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

    // Conteggio per tipo
    details.forEach((pokemon: PokemonDetails) => {
      pokemon.types.forEach((t: any) => {
        const typeName = t.type.name;
        stats.pokemonByType[typeName] = (stats.pokemonByType[typeName] || 0) + 1;
      });
    });

    // Conteggio per colore
    species.forEach((s: PokemonSpecies) => {
      const colorName = s.color.name;
      stats.pokemonByColor[colorName] = (stats.pokemonByColor[colorName] || 0) + 1;
    });

    // Conteggio per forma
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
}
