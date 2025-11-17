import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  imports: [RouterLink],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails {
    private readonly route = inject(ActivatedRoute);        // Per accedere ai parametri della rotta

}
