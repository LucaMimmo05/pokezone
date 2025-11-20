import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Home } from './pages/home/home';
import { PokemonDetails } from './pokemon-details/pokemon-details';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: Home },
  {
        path: 'pokemon',
        component: PokemonDetails,
        title: 'Dettagli Pokémon'
    }
];
