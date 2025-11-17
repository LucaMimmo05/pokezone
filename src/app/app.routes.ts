import { Routes } from '@angular/router';
import { PokemonDetails } from './pokemon-details/pokemon-details';

export const routes: Routes = [
    {
        path: 'pokemon/:id',
        component: PokemonDetails,
        title: 'Dettagli Pokémon'
    }
];
