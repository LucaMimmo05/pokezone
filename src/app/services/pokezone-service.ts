import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Pokemon } from '../models/pokemon-details/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokezoneService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  async getPokemonDetails(id: number): Promise<Pokemon> {
    const response = this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
    return firstValueFrom(response);
  }

  async getPokemonCategory(id: number): Promise <any> {
    const response = this.http.get<any>(`${this.baseUrl}/pokemon-species/${id}`);
    const data = await firstValueFrom(response);
    const englishName = data.genera.find((g: any) => g.language.name === 'en');
    return englishName ? englishName.genus : 'Unknown';
  }

  async getPokemonWeaknessesByType(type: String): Promise<string[]> {
    const response = this.http.get<any>(`${this.baseUrl}/type/${type}`);
    const data = await firstValueFrom(response);
    return data.damage_relations.double_damage_from.map((t: any) => t.name);
  }
}
