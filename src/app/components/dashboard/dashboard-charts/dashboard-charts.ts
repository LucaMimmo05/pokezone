import { Component, Input } from '@angular/core';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'dashboard-charts',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard-charts.html',
  styleUrl: './dashboard-charts.css',
})
export class DashboardChartsComponent {
  @Input() colorChartOptions!: Partial<ApexOptions>;
  @Input() shapeChartOptions!: Partial<ApexOptions>;
}
