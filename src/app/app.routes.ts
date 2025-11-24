import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Home } from './pages/home/home';
import { PokemonDetails } from './pages/pokemon-details/pokemon-details';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: Home },
  {
    path: 'pokemon/:id',
    component: PokemonDetails },
];
