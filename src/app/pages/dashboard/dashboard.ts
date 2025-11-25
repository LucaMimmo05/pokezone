import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';
import { PokemonService, DashboardStats } from '../../services/pokemon.service';
import { from } from 'rxjs';

import { DropSVG } from '../../svg/drop-svg/drop-svg';
import { LightningSVG } from '../../svg/lightning-svg/lightning-svg';
import { MessageSVG } from '../../svg/message-svg/message-svg';
import { FireSVG } from '../../svg/fire-svg/fire-svg';
import { SnowSVG } from '../../svg/snow-svg/snow-svg';
import { LeafSVG } from '../../svg/leaf-svg/leaf-svg';
import { SparkSVG } from '../../svg/spark-svg/spark-svg';
import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    NgApexchartsModule,
    DropSVG,
    LightningSVG,
    MessageSVG,
    FireSVG,
    SnowSVG,
    LeafSVG,
    SparkSVG,
    LoaderComponent,
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

  // Color mappings
  readonly typeColors: Record<string, string> = {
    fire: '#FF9C54', water: '#4D90D5', grass: '#62BB5B', electric: '#F3D23B',
    psychic: '#F97176', ice: '#74CEC0', dragon: '#0A6DC4', dark: '#5A5465',
    fairy: '#EC8FE6', normal: '#9099A1', fighting: '#CE4069', flying: '#8FA8DD',
    poison: '#AB6AC8', ground: '#D97746', rock: '#C7B78B', bug: '#90C12C',
    ghost: '#5269AC', steel: '#5A8EA1'
  };

  readonly colorColors: Record<string, string> = {
    red: '#ff4444', blue: '#4169e1', yellow: '#ffd700', green: '#32cd32',
    black: '#333333', brown: '#8b4513', purple: '#9370db', gray: '#808080',
    white: '#f5f5f5', pink: '#ffb6c1'
  };

  readonly shapeColors: string[] = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e67e22', '#34495e', '#e91e63', '#16a085',
    '#f1c40f', '#8e44ad', '#c0392b', '#27ae60'
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
    this.colorInterval = setInterval(() => {
      this.onChangeBg();
    }, 7000);
  }

  private onChangeBg() {
    if (this.currentBgColor === '#c20001') {
      this.currentBgColor = '#3f67ba';
      this.currentSvgColor = '#6F96E8';
    } else {
      this.currentBgColor = '#c20001';
      this.currentSvgColor = '#E87878';
    }
  }

  private convertToEntries(data: { [key: string]: number }): { name: string; count: number }[] {
    return Object.entries(data)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count);
  }

  private setupPlaceholderData(): void {
    const placeholderTypes = Object.keys(this.typeColors);
    const placeholderColors = Object.keys(this.colorColors);
    const placeholderShapes = ['ball', 'squiggle', 'fish', 'arms', 'blob', 'upright', 'wings', 'tentacles', 'heads', 'humanoid'];
    
    this.typeEntries = placeholderTypes.map(name => ({ name, count: 0 }));
    this.colorEntries = placeholderColors.map(name => ({ name, count: 0 }));
    this.shapeEntries = placeholderShapes.map(name => ({ name, count: 0 }));
    
    this.stats = {
      totalPokemon: 0,
      totalTypes: placeholderTypes.length,
      pokemonByType: {},
      pokemonByColor: {},
      pokemonByShape: {}
    };
  }

  loadStats() {
    this.loading = true;
    from(this.pokemonService.getDashboardStats()).subscribe({
      next: (data: DashboardStats) => {
        this.stats = data;
        this.typeEntries = this.convertToEntries(data.pokemonByType);
        this.colorEntries = this.convertToEntries(data.pokemonByColor);
        this.shapeEntries = this.convertToEntries(data.pokemonByShape);
        this.initCharts();
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Data unavailable. Please try again later.';
        this.apiFailed = true;
        this.setupPlaceholderData();
        this.initChartsPlaceholder();
        this.loading = false;
      }
    });
  }

  getBarWidth(count: number): number {
    if (!this.typeEntries.length) return 0;
    const maxCount = Math.max(...this.typeEntries.map((e) => e.count));
    // Scala da 20% (minimo) a 100% (massimo) per rendere le barre più visibili
    const percentage = (count / maxCount) * 100;
    return Math.max(20, percentage);
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private createPieChartOptions(entries: typeof this.colorEntries, colors: string[], type: 'pie' | 'donut'): Partial<ApexOptions> {
    const hasData = entries.some(e => e.count > 0);
    
    return {
      series: hasData ? entries.map((e) => e.count) : [],
      chart: {
        type,
        height: 410,
        animations: { enabled: hasData }
      },
      labels: entries.map((e) => this.capitalizeFirstLetter(e.name)),
      colors,
      legend: { position: 'bottom' },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { height: 380 },
          legend: { position: 'bottom' }
        }
      }],
      noData: { text: 'Data unavailable', align: 'center' }
    };
  }

  initCharts(): void {
    this.colorChartOptions = this.createPieChartOptions(
      this.colorEntries,
      this.colorEntries.map((e) => this.colorColors[e.name] || '#95a5a6'),
      'donut'
    );

    this.shapeChartOptions = this.createPieChartOptions(
      this.shapeEntries,
      this.shapeColors,
      'pie'
    );
  }

  initChartsPlaceholder(): void {
    this.initCharts();
  }

  goBack(): void {
    this.location.back();
  }
}
