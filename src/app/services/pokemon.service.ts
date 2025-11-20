import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  species: { url: string };
}

export interface PokemonSpecies {
  color: { name: string };
  shape: { name: string } | null;
}

export interface DashboardStats {
  totalPokemon: number;
  totalTypes: number;
  pokemonByType: { [key: string]: number };
  pokemonByColor: { [key: string]: number };
  pokemonByShape: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  getAllPokemon(limit?: number): Observable<Pokemon[]> {
    const url = limit ? `${this.baseUrl}/pokemon?limit=${limit}` : `${this.baseUrl}/pokemon?limit=100000`;
    return this.http.get<{ results: Pokemon[] }>(url)
      .pipe(map((response: any) => response.results));
  }

  getPokemonDetails(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url);
  }

  getPokemonSpecies(url: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(url);
  }

  getDashboardStats(limit?: number): Observable<DashboardStats> {
    return this.getAllPokemon(limit).pipe(
      switchMap((pokemons: Pokemon[]) => {
        const detailRequests = pokemons.map((p: Pokemon) => this.getPokemonDetails(p.url));
        
        return forkJoin(detailRequests).pipe(
          switchMap((details: PokemonDetails[]) => {
            const speciesRequests = details.map((d: PokemonDetails) => this.getPokemonSpecies(d.species.url));
            
            return forkJoin(speciesRequests).pipe(
              map((species: PokemonSpecies[]) => {
                const stats: DashboardStats = {
                  totalPokemon: details.length,
                  totalTypes: 0,
                  pokemonByType: {},
                  pokemonByColor: {},
                  pokemonByShape: {}
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
              })
            );
          })
        );
      })
    );
  }
}
