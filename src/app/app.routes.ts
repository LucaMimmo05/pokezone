import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { PokemonDetails } from './pages/pokemon-details/pokemon-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: Home },
  {
    path: 'pokemon/:id',
    component: PokemonDetails,
  },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: 'not-found' },
];
