import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../services/pokemon.service';

@Component({
  selector: 'dashboard-stats',
  imports: [],
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.css',
})
export class DashboardStatsComponent {
  @Input() stats: DashboardStats | null = null;
  @Input() typeEntries: { name: string; count: number }[] = [];
}
