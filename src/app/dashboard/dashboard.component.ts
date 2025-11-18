import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PokemonService, DashboardStats } from '../services/pokemon.service';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend
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
};

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  
  stats: DashboardStats | null = null;
  loading = true;
  error = '';

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
        this.error = 'Errore nel caricamento dei dati';
        this.loading = false;
        console.error(err);
      }
    });
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

    // Grafico Tipo (Barre orizzontali)
    this.typeChartOptions = {
      series: [{
        name: 'Pokemon',
        data: this.typeEntries.map(e => e.count)
      }],
      chart: {
        type: 'bar',
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          barHeight: '70%'
        }
      },
      colors: this.typeEntries.map(e => this.typeColors[e.name] || '#95a5a6'),
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: this.typeEntries.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1))
      },
      legend: {
        show: false
      }
    };
  }
}
