import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PokemonDetails } from '../pokemon-details/pokemon-details';

@Injectable({
  providedIn: 'root'
})
export class PokezoneService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  
  id = 1; // proprietà corretta

  async getPokemonDetails(id: number): Promise<PokemonDetails> {
    const response = this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${id}`);
    return firstValueFrom(response);
}
}
