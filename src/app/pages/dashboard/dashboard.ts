// Angular core
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

// Third-party
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';
import { from } from 'rxjs';

// Services
import { PokemonService, DashboardStats } from '../../services/pokemon.service';

// Components
import { LoaderComponent } from '../../components/loader/loader';
import { DashboardHeroComponent } from '../../components/dashboard/dashboard-hero/dashboard-hero';
import { DashboardStatsComponent } from '../../components/dashboard/dashboard-stats/dashboard-stats';
import { DashboardChartsComponent } from '../../components/dashboard/dashboard-charts/dashboard-charts';
import { DashboardTypeBarsComponent } from '../../components/dashboard/dashboard-type-bars/dashboard-type-bars';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    NgApexchartsModule,
    LoaderComponent,
    DashboardHeroComponent,
    DashboardStatsComponent,
    DashboardChartsComponent,
    DashboardTypeBarsComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly pokemonService = inject(PokemonService);
  private readonly location = inject(Location);
  private colorInterval?: number;

  // State
  stats: DashboardStats | null = null;
  loading = true;
  error = '';
  apiFailed = false;

  // Hero animation
  currentBgColor = '#c20001';
  currentSvgColor = '#E87878';

  // Chart data
  typeEntries: { name: string; count: number }[] = [];
  colorEntries: { name: string; count: number }[] = [];
  shapeEntries: { name: string; count: number }[] = [];

  colorChartOptions!: Partial<ApexOptions>;
  shapeChartOptions!: Partial<ApexOptions>;

  // Pokemon type colors
  readonly typeColors: Record<string, string> = {
    fire: '#FF9C54',
    water: '#4D90D5',
    grass: '#62BB5B',
    electric: '#F3D23B',
    psychic: '#F97176',
    ice: '#74CEC0',
    dragon: '#0A6DC4',
    dark: '#5A5465',
    fairy: '#EC8FE6',
    normal: '#9099A1',
    fighting: '#CE4069',
    flying: '#8FA8DD',
    poison: '#AB6AC8',
    ground: '#D97746',
    rock: '#C7B78B',
    bug: '#90C12C',
    ghost: '#5269AC',
    steel: '#5A8EA1',
  };

  // Pokemon body colors
  readonly colorColors: Record<string, string> = {
    red: '#ff4444',
    blue: '#4169e1',
    yellow: '#ffd700',
    green: '#32cd32',
    black: '#333333',
    brown: '#8b4513',
    purple: '#9370db',
    gray: '#808080',
    white: '#f5f5f5',
    pink: '#ffb6c1',
  };

  // Pokemon shape colors (rainbow gradient)
  readonly shapeColors: string[] = [
    '#e74c3c',
    '#3498db',
    '#2ecc71',
    '#f39c12',
    '#9b59b6',
    '#1abc9c',
    '#e67e22',
    '#34495e',
    '#e91e63',
    '#16a085',
    '#f1c40f',
    '#8e44ad',
    '#c0392b',
    '#27ae60',
  ];

  ngOnInit() {
    this.loadStats();
    this.startColorAnimation();
  }

  ngOnDestroy() {
    if (this.colorInterval) {
      clearInterval(this.colorInterval);
    }
  }

  private startColorAnimation() {
    this.colorInterval = setInterval(() => this.onChangeBg(), 7000);
  }

  private onChangeBg() {
    const isPrimary = this.currentBgColor === '#c20001';
    this.currentBgColor = isPrimary ? '#3f67ba' : '#c20001';
    this.currentSvgColor = isPrimary ? '#6F96E8' : '#E87878';
  }

  private convertToEntries(data: Record<string, number>): { name: string; count: number }[] {
    return Object.entries(data)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  private setupPlaceholderData(): void {
    this.typeEntries = Object.keys(this.typeColors).map(name => ({ name, count: 0 }));
    this.colorEntries = Object.keys(this.colorColors).map(name => ({ name, count: 0 }));
    this.shapeEntries = [
      'ball',
      'squiggle',
      'fish',
      'arms',
      'blob',
      'upright',
      'wings',
      'tentacles',
      'heads',
      'humanoid',
    ].map(name => ({ name, count: 0 }));

    this.stats = {
      totalPokemon: 0,
      totalTypes: this.typeEntries.length,
      pokemonByType: {},
      pokemonByColor: {},
      pokemonByShape: {},
    };
  }

  loadStats() {
    this.loading = true;

    from(this.pokemonService.getDashboardStats()).subscribe({
      next: (data) => {
        this.stats = data;
        this.typeEntries = this.convertToEntries(data.pokemonByType);
        this.colorEntries = this.convertToEntries(data.pokemonByColor);
        this.shapeEntries = this.convertToEntries(data.pokemonByShape);
        this.initCharts();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats:', err);
        this.error = 'Data unavailable. Please try again later.';
        this.apiFailed = true;
        this.setupPlaceholderData();
        this.initChartsPlaceholder();
        this.loading = false;
      },
    });
  }

  getBarWidth(count: number): number {
    if (!this.typeEntries.length) return 0;

    const maxCount = Math.max(...this.typeEntries.map(e => e.count));
    const percentage = (count / maxCount) * 100;

    // Minimum 20% for visibility
    return Math.max(20, percentage);
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private createPieChartOptions(
    entries: { name: string; count: number }[],
    colors: string[],
    type: 'pie' | 'donut'
  ): Partial<ApexOptions> {
    const hasData = entries.some(e => e.count > 0);

    return {
      series: hasData ? entries.map(e => e.count) : [],
      chart: {
        type,
        height: 410,
        animations: { enabled: hasData },
      },
      labels: entries.map(e => this.capitalizeFirstLetter(e.name)),
      colors,
      legend: { position: 'bottom' },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { height: 380 },
            legend: { position: 'bottom' },
          },
        },
      ],
      noData: { text: 'Data unavailable', align: 'center' },
    };
  }

  initCharts(): void {
    this.colorChartOptions = this.createPieChartOptions(
      this.colorEntries,
      this.colorEntries.map(e => this.colorColors[e.name] || '#95a5a6'),
      'donut'
    );

    this.shapeChartOptions = this.createPieChartOptions(this.shapeEntries, this.shapeColors, 'pie');
  }

  initChartsPlaceholder(): void {
    this.initCharts();
  }

  goBack(): void {
    this.location.back();
  }
}
