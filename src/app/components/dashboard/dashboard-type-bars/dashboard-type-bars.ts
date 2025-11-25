import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-type-bars',
  imports: [],
  templateUrl: './dashboard-type-bars.html',
  styleUrl: './dashboard-type-bars.css',
})
export class DashboardTypeBarsComponent {
  @Input() typeEntries: { name: string; count: number }[] = [];
  @Input() typeColors: Record<string, string> = {};
  @Input() apiFailed: boolean = false;
  @Input() getBarWidth!: (count: number) => number;
}
