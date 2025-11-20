import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PokemonDetails } from './pokemon-details/pokemon-details';

export const routes: Routes = [
    { 
        path: '', 
        component: Home 
    },
    {
        path: 'pokemon',
        component: PokemonDetails,
        title: 'Dettagli Pokémon'
    }
];
