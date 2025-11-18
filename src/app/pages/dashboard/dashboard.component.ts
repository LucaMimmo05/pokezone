import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PokemonService, DashboardStats } from '../../services/pokemon.service';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries | any[];
  chart: ApexChart;
  labels: string[];
  colors?: string[];
  responsive?: ApexResponsive[];
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  grid?: ApexGrid;
};

import { DropSVG } from '../../svg/drop-svg/drop-svg';
import { LightningSVG } from '../../svg/lightning-svg/lightning-svg';
import { MessageSVG } from '../../svg/message-svg/message-svg';
import { FireSVG } from '../../svg/fire-svg/fire-svg';
import { SnowSVG } from '../../svg/snow-svg/snow-svg';
import { LeafSVG } from '../../svg/leaf-svg/leaf-svg';
import { SparkSVG } from '../../svg/spark-svg/spark-svg';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgApexchartsModule, DropSVG, LightningSVG, MessageSVG, FireSVG, SnowSVG, LeafSVG, SparkSVG],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  
  stats: DashboardStats | null = null;
  loading = true;
  error = '';
  apiFailed = false;
  placeholderMode = false;

  typeEntries: { name: string; count: number }[] = [];
  colorEntries: { name: string; count: number }[] = [];
  shapeEntries: { name: string; count: number }[] = [];

  colorChartOptions!: Partial<ChartOptions>;
  shapeChartOptions!: Partial<ChartOptions>;
  typeChartOptions!: Partial<ChartOptions>;

  typeColors: { [key: string]: string } = {
    'fire': '#FF9C54',
    'water': '#4D90D5',
    'grass': '#62BB5B',
    'electric': '#F3D23B',
    'psychic': '#F97176',
    'ice': '#74CEC0',
    'dragon': '#0A6DC4',
    'dark': '#5A5465',
    'fairy': '#EC8FE6',
    'normal': '#9099A1',
    'fighting': '#CE4069',
    'flying': '#8FA8DD',
    'poison': '#AB6AC8',
    'ground': '#D97746',
    'rock': '#C7B78B',
    'bug': '#90C12C',
    'ghost': '#5269AC',
    'steel': '#5A8EA1'
  };

  colorColors: { [key: string]: string } = {
    'red': '#ff4444',
    'blue': '#4169e1',
    'yellow': '#ffd700',
    'green': '#32cd32',
    'black': '#333333',
    'brown': '#8b4513',
    'purple': '#9370db',
    'gray': '#808080',
    'white': '#f5f5f5',
    'pink': '#ffb6c1'
  };

  shapeColors: string[] = ['#e74c3c', '#e67e22', '#f39c12', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#e91e63', '#95a5a6'];

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.pokemonService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.typeEntries = Object.entries(data.pokemonByType)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
        
        this.colorEntries = Object.entries(data.pokemonByColor)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
        
        this.shapeEntries = Object.entries(data.pokemonByShape)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
        
        this.initCharts();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Dati non disponibili (fallback)';
        this.apiFailed = true;
        this.placeholderMode = true;
        // Crea una struttura placeholder dei dati per poter disegnare i grafici comunque
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
        this.initChartsPlaceholder();
        this.loading = false;
      }
    });
  }

  getBarWidth(count: number): number {
    if (!this.typeEntries.length) return 0;
    const maxCount = Math.max(...this.typeEntries.map(e => e.count));
    // Scala da 20% (minimo) a 100% (massimo) per rendere le barre più visibili
    const percentage = (count / maxCount) * 100;
    return Math.max(20, percentage);
  }

  initCharts(): void {
    // Grafico Colore (Pie)
    this.colorChartOptions = {
      series: this.colorEntries.map(e => e.count),
      chart: {
        type: 'pie',
        height: 380
      },
      labels: this.colorEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      colors: this.colorEntries.map(e => this.colorColors[e.name] || '#95a5a6'),
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    // Grafico Forma (Donut)
    this.shapeChartOptions = {
      series: this.shapeEntries.map(e => e.count),
      chart: {
        type: 'donut',
        height: 380
      },
      labels: this.shapeEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      colors: this.shapeColors,
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    // Grafico Tipo (Barre orizzontali con icone)
    this.typeChartOptions = {
      series: [{
        name: 'Pokemon',
        data: this.typeEntries.map(e => e.count)
      }],
      chart: {
        type: 'bar',
        height: 600,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          barHeight: '65%',
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: this.typeEntries.map(e => this.typeColors[e.name] || '#95a5a6'),
      dataLabels: {
        enabled: true,
        offsetX: 30,
        style: {
          fontSize: '12px',
          fontWeight: 600
        }
      },
      xaxis: {
        categories: this.typeEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)),
        labels: {
          style: {
            fontSize: '13px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '13px'
          }
        }
      },
      legend: {
        show: false
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      }
    };
  }

  // Versione placeholder dei grafici (serie vuote, testo noData)
  initChartsPlaceholder(): void {
    this.colorChartOptions = {
      series: [],
      labels: this.colorEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      colors: this.colorEntries.map(e => this.colorColors[e.name] || '#95a5a6'),
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { height: 300 }, legend: { position: 'bottom' } } }],
      chart: { type: 'pie', height: 380, animations: { enabled: false } },
      // @ts-ignore
      noData: { text: 'Dati non disponibili', align: 'center' }
    };

    this.shapeChartOptions = {
      series: [],
      chart: { type: 'donut', height: 380, animations: { enabled: false } },
      labels: this.shapeEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)),
      colors: this.shapeColors,
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { height: 300 }, legend: { position: 'bottom' } } }],
      // @ts-ignore
      noData: { text: 'Dati non disponibili', align: 'center' }
    };

    this.typeChartOptions = {
      series: [{ name: 'Pokemon', data: [] }],
      chart: { type: 'bar', height: 600, animations: { enabled: false }, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, distributed: true, barHeight: '65%' } },
      colors: this.typeEntries.map(e => this.typeColors[e.name] || '#95a5a6'),
      dataLabels: { enabled: false },
      xaxis: { categories: this.typeEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)) },
      legend: { show: false },
      // @ts-ignore
      noData: { text: 'Dati non disponibili', align: 'center' }
    };
  }
}
